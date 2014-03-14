// Renders the keyboard to our container DIV via Raphaël.
define([
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'raphael',
    'app/model',
    'app/router',
    'app/utils',
    'app/layout',
    'app/chords'
], function ($, bootstrap, _, Backbone, raphael, appModel, appRouter, utils, layout, chords) {
    'use strict';

    var scaleColors, octaveColors, AppView;

    // Color codes for coloring the scale lines
    scaleColors = ['orange', 'blue', 'red', 'green', 'orange', 'blue'];

    // Color codes for coloring the octaves
    octaveColors = ['#71a8d7', '#e37e7b', '#85ca85', '#e6cb84'];

    AppView = Backbone.View.extend({
        paper: null,
        showOctaveColors: false,

        el: $('#the-keyboard')[0],

        events: {
            'click #toggle-octavecolors': 'toggleOctaveColors'
        },

        // Initialie Raphaël and listen to changes
        initialize: function () {
            var self = this;
            this.paper = raphael(this.el, 760, 440);
            this.render();
            this.model.bind('change', this.render, this);
            this.model.bind('change', function () {
                _.each(['mode', 'quality'], function (e) {
                    $('#select-' + e + ' button').removeClass('btn-primary');
                    $('#select-' + e + ' button[data-' + e + '="' + self.model.get(e) + '"]').addClass('btn-primary');
                });
                $('#select-key a').removeClass('btn-primary');
                $('#select-key a[data-key="' + self.model.get('key') + '"]').addClass('btn-primary');
            });
        },

        // Render button layout (with colored octaves)
        renderButtons: function (side, direction) {
            var currentLayout, k, label, key, labelDisplay, octave, fill;

            currentLayout = layout[side][direction];

            for (k in currentLayout) {
                label = k;
                key = label[0];
                labelDisplay = label[0];
                octave = +label[1];
                if (label[1] === '#') {
                    octave = +label[2];
                    key += label[1];
                }
                if (octave === 0) labelDisplay = label[0].toUpperCase();
                if (label[1] === '#') labelDisplay += '♯';
                else if (label[1] === 'b') labelDisplay += '♭';
                if (octave === 1) labelDisplay += '';
                else if (octave === 2) labelDisplay += '’';
                else if (octave === 3) labelDisplay += '’’';
                else if (octave === 4) labelDisplay += '’’’';

                fill = (this.showOctaveColors ? octaveColors[octave % (octaveColors.length)] : 'white');

                this.paper.circle(currentLayout[k][0] + 10, currentLayout[k][1] + 30, 30)
                    .attr({
                        'stroke': '#222',
                        'stroke-width': 2,
                        'fill': fill,
                        'fill-opacity': 0.5
                    });

                this.paper.text(currentLayout[k][0] + 10, currentLayout[k][1] + 30, labelDisplay)
                    .attr({
                        'fill': '#222',
                        'font-family': 'Georgia, serif',
                        'font-size': 21,
                        'font-style': 'italic',
                        'cursor': 'default'
                    });
            }
        },

        // Render a specific scale
        renderScale: function (side, direction, scale, color) {
            var currentLayout, pathString, t;

            currentLayout = layout[side][direction];
            if (!currentLayout) return;

            pathString = '';
            for (t in scale) {
                if (currentLayout.hasOwnProperty(scale[t])) {
                    pathString += (pathString === '') ? 'M' : 'L';
                    pathString += currentLayout[scale[t]][0] + 10;
                    pathString += ',';
                    pathString += currentLayout[scale[t]][1] + 30;
                }
            }

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
        renderChord: function (side, direction, key, quality) {
            if (! chords[side][direction][quality]) return;

            var chord, currentLayout, k, label;

            chord = chords[side][direction][quality][key];
            if (!chord) return;
            
            currentLayout = layout[side][direction];
            if (!currentLayout) return;

            for (k in currentLayout) {
                if (_.indexOf(chord, k) === -1) continue;
                label = k;
                this.paper.circle(currentLayout[k][0] + 10, currentLayout[k][1] + 30, 28)
                    .attr({
                        'stroke': '#222',
                        'stroke-width': 4,
                        'fill': 'black',
                        'fill-opacity': 0.33
                    });
            }
        },

        // Render the whole layout with buttons, octaves and scale
        render: function () {
            var side, direction, key, mode, quality, o, scale;

            side = this.model.get('side');
            direction = this.model.get('direction');
    
            if (!side || !direction) return;

            this.paper.clear();
            this.renderButtons(side, direction);

            $('#nav-sides a[href="#' + side + '-' + direction + '"]').tab('show');

            key = this.model.get('key');
            mode = this.model.get('mode');
            quality = this.model.get('quality');

            if (!key || (!mode && !quality)) {
                // render keyboard only
                appRouter.navigate('!/' + side + '/' + direction, {replace: true});
                return;
            }

            if (mode) {
                // render scale
                for (o = -1; o < 5; o++) {
                    scale = utils.scale(key, o, mode);
                    scale.push(key + '' + (o + 1));
                    this.renderScale(side, direction, scale, scaleColors[o + 1]);
                }

                appRouter.navigate('!/' + side + '/' + direction + '/scale/' +
                    key + '/' + mode, {replace: true});
            } else if (quality) {
                // render chord
                this.renderChord(side, direction, key, quality);
                appRouter.navigate('!/' + side + '/' + direction + '/chord/' +
                    key + '/' + quality, {replace: true});
            }

            return this;
        },

        // Toggle colored octaves and re-render
        toggleOctaveColors: function () {
            this.showOctaveColors = !this.showOctaveColors;
            this.render();
        }
    });

    return new AppView({ model: appModel, router: appRouter });
});
