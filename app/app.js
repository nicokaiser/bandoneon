import Backbone from 'backbone';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import 'css/bandoneon.css';

import Model from './model';
import Router from './router';
import View from './view';

$(function () {
    const model = new Model();
    const router = new Router({ model });
    const view = new View({ model, router });

    Backbone.history.start();

    // octave color toggle
    $('#toggle-octavecolors').click(function () {
        view.toggleOctaveColors();
        $('#toggle-octavecolors').button('toggle');
    });

    $('#scale-form').submit(function () {
        return false;
    });

    // key selection
    function selectTonic(tonic, force) {
        if (!force && model.get('tonic') === tonic) {
            model.set({ tonic: null, mode: null, name: null });
        } else {
            model.set({
                tonic,
                name: model.get('name') || 'M',
                mode: model.get('mode') || 'chord'
            });
        }
    }

    $('#select-tonic a').click(function (e) {
        e.preventDefault();
        selectTonic($(this).data('tonic'));
    });

    // mode selection
    function selectScaleName(name) {
        model.set({
            tonic: model.get('tonic') || 'C',
            name,
            mode: 'scale'
        });
    }

    $('#select-scalename button').click(function (e) {
        e.preventDefault();
        selectScaleName($(this).data('scalename'));
    });

    // chord quality selection
    function selectChordName(name) {
        model.set({
            tonic: model.get('tonic') || 'C',
            name,
            mode: 'chord'
        });
    }

    $('#select-chordname button').click(function (e) {
        e.preventDefault();
        selectChordName($(this).data('chordname'));
    });

    // side / direction navigation
    $('#nav-sides a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        switch (e.target.hash) {
            case '#left-open':
                model.set({ variant: 'left-open' });
                break;
            case '#left-close':
                model.set({ variant: 'left-close' });
                break;
            case '#right-open':
                model.set({ variant: 'right-open' });
                break;
            case '#right-close':
                model.set({ variant: 'right-close' });
                break;
        }
    });

    // keypress events
    $('body').keypress(function (e) {
        const tonic = model.get('tonic');
        switch (e.keyCode) {
            case 114: // r
                model.set({ variant: 'right-open' });
                break;
            case 82: // R
                model.set({ variant: 'right-close' });
                break;
            case 108: // l
                model.set({ variant: 'left-open' });
                break;
            case 76: // L
                model.set({ variant: 'left-close' });
                break;
            case 35: // #
                if (tonic && tonic.length === 1) {
                    model.set('tonic', tonic + '#');
                }
                break;
            case 67: // C
                view.toggleOctaveColors();
                $('#toggle-octavecolors').button('toggle');
                break;
            case 77: // M
                selectChordName('M');
                break;
            case 109: // m
                selectChordName('m');
                break;
            case 55: // 7
                selectChordName('7');
                break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
                model.set('tonic', String.fromCharCode(e.keyCode - 32));
                break;
        }
    });
});
