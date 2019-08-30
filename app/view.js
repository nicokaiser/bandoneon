import $ from 'jquery';
import Backbone from 'backbone';
import raphael from 'raphael';
import { note, transpose } from '@tonaljs/tonal';
import { scale } from '@tonaljs/scale';
import { chord } from '@tonaljs/chord';

// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap';

// Color codes for coloring the scale lines
const scaleColors = ['orange', 'blue', 'red', 'green', 'orange', 'blue'];

// Color codes for coloring the octaves
const octaveColors = ['#71a8d7', '#e37e7b', '#85ca85', '#e6cb84'];

// Color codes for chords
const chordColors = ['#000', '#666', '#999', '#ccc'];

export default Backbone.View.extend({
    paper: null,
    showOctaveColors: false,

    events: {
        'click #toggle-octavecolors': 'toggleOctaveColors'
    },

    // Initialize Raphaël and listen to changes
    initialize: function(options) {
        this.router = options.router;

        this.instrument = this.model.get('instrument');

        this.el = $('#the-keyboard')[0];
        this.paper = raphael(this.el, 690, 440);
        this.render();
        this.model.bind('change', this.render, this);
        this.model.bind('change', () => {
            $('#select-scalename button')
                .removeClass('btn-primary')
                .addClass('btn-outline-secondary');
            $('#select-chordname button')
                .removeClass('btn-primary')
                .addClass('btn-outline-secondary');

            switch (this.model.get('mode')) {
                case 'chord':
                    $('#select-chordname button[data-chordname="' + this.model.get('name') + '"]')
                        .removeClass('btn-outline-secondary')
                        .addClass('btn-primary');
                    break;
                case 'scale':
                    $('#select-scalename button[data-scalename="' + this.model.get('name') + '"]')
                        .removeClass('btn-outline-secondary')
                        .addClass('btn-primary');
                    break;
                default:
            }

            $('#select-tonic a')
                .removeClass('btn-primary')
                .addClass('btn-outline-secondary');
            $('#select-tonic a[data-tonic="' + this.model.get('tonic') + '"]')
                .removeClass('btn-outline-secondary')
                .addClass('btn-primary');
        });
    },

    // Render button layout (with colored octaves)
    renderButtons: function(variant) {
        const positions = this.instrument.positions(variant);

        Object.keys(positions).forEach(k => {
            const label = k;
            let labelDisplay = label[0].toLowerCase();
            let octave = +label[1];
            if (label[1] === '#') octave = +label[2];

            if (octave === 0) labelDisplay = label[0].toUpperCase();
            if (label[1] === '#') labelDisplay += '♯';
            else if (label[1] === 'b') labelDisplay += '♭';
            if (octave === 1) labelDisplay += '';
            else if (octave === 2) labelDisplay += '’';
            else if (octave === 3) labelDisplay += '’’';
            else if (octave === 4) labelDisplay += '’’’';

            const fill = this.showOctaveColors ? octaveColors[octave % octaveColors.length] : 'white';

            this.paper.circle(positions[k][0] + 10, positions[k][1] + 28, 28).attr({
                stroke: '#333',
                'stroke-width': 1,
                fill: fill,
                'fill-opacity': 0.5
            });

            this.paper.text(positions[k][0] + 10, positions[k][1] + 28, labelDisplay).attr({
                fill: '#222',
                'font-family': 'Georgia, serif',
                'font-size': 21,
                'font-style': 'italic',
                cursor: 'default'
            });
        });
    },

    // Render a specific scale
    renderScale: function(variant, notes, color) {
        const positions = this.instrument.positions(variant);

        let pathString = '';
        notes.forEach(n => {
            const no = note(n);
            const idx = Object.keys(positions).find(v => note(v).height === no.height);
            if (idx) {
                const [x, y] = positions[idx];
                pathString += pathString === '' ? 'M' : 'L';
                pathString += x + 10;
                pathString += ',';
                pathString += y + 30;
            }
        });

        if (pathString === '') return;

        return this.paper.path(pathString).attr({
            stroke: color,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 3,
            'stroke-opacity': 0.66
        });
    },

    // Render a chord (left side only)
    renderChord: function(variant, tonic, name) {
        const c = chord(`${tonic}${name}`);
        if (c.empty) return;

        // console.log(c.tonic + ' ' + c.aliases[0]);
        const positions = this.instrument.positions(variant);

        for (let i = 0; i <= c.notes.length; i++) {
            const n = note(c.notes[i]);
            console.log(n);

            Object.keys(positions).forEach(k => {
                const { chroma } = note(k);
                if (chroma !== n.chroma) return;

                this.paper.circle(positions[k][0] + 10, positions[k][1] + 29, 28).attr({
                    stroke: '#222',
                    'stroke-width': i === 0 ? 3 : 2,
                    fill: chordColors[i],
                    'fill-opacity': 0.5
                });
            });
        }
    },

    // Render the whole layout with buttons, octaves and scale
    render: function() {
        const variant = this.model.get('variant');

        this.paper.clear();
        this.renderButtons(variant);

        $('#nav-sides a[href="#' + variant + '"]').tab('show');

        const mode = this.model.get('mode');
        const tonic = this.model.get('tonic');
        const name = this.model.get('name');

        if (mode === 'scale') {
            // render scale
            const { intervals, empty } = scale(name);
            if (empty) return;
            for (let o = -1; o < 5; o++) {
                const notes = intervals.map(i => transpose(`${tonic}${o}`, i));
                notes.push(`${tonic}${o + 1}`);
                this.renderScale(variant, notes, scaleColors[o + 1]);
            }

            this.router.navigate(
                `!/${encodeURIComponent(variant)}/scale/${encodeURIComponent(tonic)}/${encodeURIComponent(name)}`,
                { replace: true }
            );
        } else if (mode === 'chord') {
            // render chord
            this.renderChord(variant, tonic, name);

            this.router.navigate(
                `!/${encodeURIComponent(variant)}/chord/${encodeURIComponent(tonic)}/${encodeURIComponent(name)}`,
                { replace: true }
            );
        } else {
            // render keyboard only
            this.router.navigate('!/' + variant, { replace: true });
        }

        return this;
    },

    // Toggle colored octaves and re-render
    toggleOctaveColors: function() {
        this.showOctaveColors = !this.showOctaveColors;
        this.render();
    }
});
