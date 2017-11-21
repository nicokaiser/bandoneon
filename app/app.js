import Backbone from 'backbone';
import bootstrap from 'bootstrap';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import 'css/bandoneon.css';

import appView from './view';
import appModel from './model';

Backbone.history.start();

$(function() {
    // octave color toggle
    $('#toggle-octavecolors').click(function () {
        appView.toggleOctaveColors();
        $('#toggle-octavecolors').button('toggle');
    });

    $('#scale-form').submit(function () {
        return false;
    });

    // key selection
    function selectTonic(tonic, force) {
        if (!force && appModel.get('tonic') === tonic) {
            appModel.set({ tonic: null, mode: null, name: null });
        } else {
            appModel.set('tonic', tonic);
            if (!appModel.get('name')) appModel.set('name', 'M');
            if (!appModel.get('mode')) appModel.set('mode', 'chord');
            //$(this).addClass('btn-primary');
        }
    }

    $('#select-tonic a').click(function (e) {
        e.preventDefault();
        selectTonic($(this).data('tonic'));
    });

    // mode selection
    function selectScaleName(name) {
        appModel.set({
            tonic: appModel.get('tonic') || 'C',
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
        appModel.set({
            tonic: appModel.get('tonic') || 'C',
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
            appModel.set({ variant: 'left-open' });
            break;
        case '#left-close':
        appModel.set({ variant: 'left-close' });
            break;
        case '#right-open':
            appModel.set({ variant: 'right-open' });
            break;
        case '#right-close':
            appModel.set({ variant: 'right-close' });
            break;
        }
    });

    // keypress events
    $('body').keypress(function (e) {
        switch (e.keyCode) {
        case 114: // r
            appModel.set({ variant: 'right-open' });
            break;
        case 82: // R
            appModel.set({ variant: 'right-close' });
            break;
        case 108: // l
            appModel.set({ variant: 'left-open' });
            break;
        case 76: // L
            appModel.set({ variant: 'left-close' });
            break;
        case 35: // #
            const tonic = appModel.get('tonic');
            if (tonic && (tonic.length === 1)) {
                appModel.set('tonic', tonic + '#');
            }
            break;
        case 67: // C
            appView.toggleOctaveColors();
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
            appModel.set('tonic', String.fromCharCode(e.keyCode - 32));
            break;
        }
    });
});
