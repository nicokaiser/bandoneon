import $ from 'jquery';
import bootstrap from 'bootstrap';
import Backbone from 'backbone';
import raphael from 'raphael';
import { transpose, scale } from 'tonal';

// Color codes for coloring the scale lines
const scaleColors = ['orange', 'blue', 'red', 'green', 'orange', 'blue'];

// Color codes for coloring the octaves
const octaveColors = ['#71a8d7', '#e37e7b', '#85ca85', '#e6cb84'];

export default Backbone.View.extend({
    paper: null,
    showOctaveColors: false,

    events: {
        'click #toggle-octavecolors': 'toggleOctaveColors'
    },

    // Initialize Raphaël and listen to changes
    initialize: function (options) {
        this.router = options.router;

        this.instrument = this.model.get('instrument');

        this.el = $('#the-keyboard')[0];
        this.paper = raphael(this.el, 690, 440);
        this.render();
        this.model.bind('change', this.render, this);
        this.model.bind('change', () => {
            $('#select-scalename button').removeClass('btn-primary');
            $('#select-chordname button').removeClass('btn-primary');

            switch (this.model.get('mode')) {
            case 'chord':
                $('#select-chordname button[data-chordname="' + this.model.get('name') + '"]').addClass('btn-primary');
                break;
            case 'scale':
                $('#select-scalename button[data-scalename="' + this.model.get('name') + '"]').addClass('btn-primary');
                break;
            default:
            }

            $('#select-tonic a').removeClass('btn-primary');
            $('#select-tonic a[data-tonic="' + this.model.get('tonic') + '"]').addClass('btn-primary');
        });
    },

    // Render button layout (with colored octaves)
    renderButtons: function (variant) {
        const positions = this.instrument.positions(variant);

        Object.keys(positions).forEach((k) => {
            const label = k;
            let note = label[0];
            let labelDisplay = label[0].toLowerCase();
            let octave = +label[1];
            if (label[1] === '#') {
                octave = +label[2];
                note += label[1];
            }
            if (octave === 0) labelDisplay = label[0].toUpperCase();
            if (label[1] === '#') labelDisplay += '♯';
            else if (label[1] === 'b') labelDisplay += '♭';
            if (octave === 1) labelDisplay += '';
            else if (octave === 2) labelDisplay += '’';
            else if (octave === 3) labelDisplay += '’’';
            else if (octave === 4) labelDisplay += '’’’';

            const fill = (this.showOctaveColors ? octaveColors[octave % (octaveColors.length)] : 'white');
            
            this.paper.circle(positions[k][0] + 10, positions[k][1] + 28, 28)
                .attr({
                    'stroke': '#222',
                    'stroke-width': 2,
                    'fill': fill,
                    'fill-opacity': 0.5
                });

            this.paper.text(positions[k][0] + 10, positions[k][1] + 28, labelDisplay)
                .attr({
                    'fill': '#222',
                    'font-family': 'Georgia, serif',
                    'font-size': 21,
                    'font-style': 'italic',
                    'cursor': 'default'
                });
        });
    },

    // Render a specific scale
    renderScale: function (variant, notes, color) {
        const positions = this.instrument.positions(variant);

        let pathString = '';
        notes.forEach((note) => {
            if (positions.hasOwnProperty(note)) {
                pathString += (pathString === '') ? 'M' : 'L';
                pathString += positions[note][0] + 10;
                pathString += ',';
                pathString += positions[note][1] + 30;
            }
        });

        if (pathString === '') return;

        return this.paper.path(pathString)
            .attr({
                'stroke': color,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 4,
                'stroke-opacity': 0.66
            });
    },

    // Render a chord (left side only)
    renderChord: function (variant, tonic, name) {
        const chords = this.instrument.chords(variant);
        const chord = chords[tonic + name];
        if (!chord) return;

        const positions = this.instrument.positions(variant);

        Object.keys(positions).forEach((k) => {
            if (!chord.includes(k)) return;

            this.paper.circle(positions[k][0] + 10, positions[k][1] + 30, 28)
            .attr({
                'stroke': '#222',
                'stroke-width': 4,
                'fill': 'black',
                'fill-opacity': 0.33
            });
        });
    },

    // Render the whole layout with buttons, octaves and scale
    render: function () {
        const variant = this.model.get('variant');

        this.paper.clear();
        this.renderButtons(variant);

        $('#nav-sides a[href="#' + variant + '"]').tab('show');

        const mode = this.model.get('mode');
        const tonic = this.model.get('tonic');
        const name = this.model.get('name');

        switch (mode) {
        case 'scale':
            // render scale
            for (let o = -1; o < 5; o++) {
                const intervals = scale(name);
                if (!intervals) return;
                const notes = intervals.map(transpose(`${tonic}${o}`));
                notes.push(`${tonic}${o + 1}}`);
                this.renderScale(variant, notes, scaleColors[o + 1]);
            }

            this.router.navigate(`!/${encodeURIComponent(variant)}/scale/${encodeURIComponent(tonic)}/${encodeURIComponent(name)}`, { replace: true });
            break;
        case 'chord':
            // render chord
            this.renderChord(variant, tonic, name);

            this.router.navigate(`!/${encodeURIComponent(variant)}/chord/${encodeURIComponent(tonic)}/${encodeURIComponent(name)}`, { replace: true });
            break;
        default:
            // render keyboard only
            this.router.navigate('!/' + variant, {replace: true});
            return;
        }

        return this;
    },

    // Toggle colored octaves and re-render
    toggleOctaveColors: function () {
        this.showOctaveColors = !this.showOctaveColors;
        this.render();
    }
});
