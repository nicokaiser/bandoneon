require([
    'backbone',
    'bootstrap',
    'jquery',
    'app/view',
    'app/model'
], function (Backbone, bootstrap, $, appView, appModel) {
    'use strict';

    Backbone.history.start();

    // don't submit the form
    $('#scale-form').submit(function () {
        return false;
    });

    // octave color toggle
    $('#toggle-octavecolors').click(function () {
        appView.toggleOctaveColors();
        $('#toggle-octavecolors').button('toggle');
    });

    // key selection
    function selectKey(key, force) {
        if (!force && appModel.get('key') === key) {
            // unset key
            appModel.set('key', null);
        } else {
            appModel.set('key', key);
            if (!appModel.get('mode') && !appModel.get('quality')) {
                // set default mode if none is set yet
                appModel.set('mode', 'M');
            }
            //$(this).addClass('btn-primary');
        }
    }

    $('#select-key a').click(function (e) {
        e.preventDefault();
        selectKey($(this).data('key'));
    });

    // mode selection
    function selectMode(mode, force) {
        if (!force && appModel.get('mode') === mode) {
            // unset mode
            appModel.set('mode', null);
        } else {
            appModel.set('mode', mode);
            if (! appModel.get('key')) {
                // set default key if none is set yet
                appModel.set('key', 'c');
            }
        }
        // unset quality
        appModel.set('quality', null);
    }

    $('#select-mode button').click(function (e) {
        e.preventDefault();
        selectMode($(this).data('mode'));
    });

    // chord quality selection
    function selectQuality(quality, force) {
        if (!force && appModel.get('quality') === quality) {
            // unset quality
            appModel.set('quality', null);
        } else {
            appModel.set('quality', quality);
            if (! appModel.get('key')) {
                // set default key if none is set yet
                appModel.set('key', 'c');
            }
        }
        // unset mode
        appModel.set('mode', null);
    }

    $('#select-quality button').click(function (e) {
        e.preventDefault();
        selectQuality($(this).data('quality'));
    });

    // side / direction navigation
    $('#nav-sides a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        switch (e.target.hash) {
        case '#left-open':
            appModel.set({ 'side': 'left', 'direction': 'open' });
            break;
        case '#left-close':
            appModel.set({ 'side': 'left', 'direction': 'close' });
            break;
        case '#right-open':
            appModel.set({ 'side': 'right', 'direction': 'open' });
            break;
        case '#right-close':
            appModel.set({ 'side': 'right', 'direction': 'close' });
            break;
        }
    });

    // keypress events
    $('body').keypress(function (e) {
        switch (e.keyCode) {
        case 114: // r
            appModel.set({ 'side': 'right', 'direction': 'open' });
            break;
        case 82: // R
            appModel.set({ 'side': 'right', 'direction': 'close' });
            break;
        case 108: // l
            appModel.set({ 'side': 'left', 'direction': 'open' });
            break;
        case 76: // L
            appModel.set({ 'side': 'left', 'direction': 'close' });
            break;
        case 35: // #
            var key = appModel.get('key');
            if (key && (key.length === 1)) {
                appModel.set('key', key + '#');
            }
            break;
        case 67: // C
            appView.toggleOctaveColors();
            $('#toggle-octavecolors').button('toggle');
            break;
        case 77: // M
            selectQuality('M', true);
            break;
        case 109: // m
            selectQuality('m', true);
            break;
        case 55: // 7
            selectQuality('7', true);
            break;
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
            appModel.set('key', String.fromCharCode(e.keyCode));
            break;
        }
    });
});
