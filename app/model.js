// Represents the bandoneon keyboard that can(!) have a
// direction (open/close), a side (right/left) and key + mode

import _ from 'lodash';
import Backbone from 'backbone';

import keys from './keys';
import modes from './modes';

const AppModel = Backbone.Model.extend({
    defaults: {
        direction: 'open',
        side: 'right',
        key: null,
        mode: null
    },
    validate: function (attrs) {
        // side: left, right
        if (attrs.side && _.indexOf(['left', 'right'], attrs.side) === -1) {
            return 'invalid side';
        }
        // direction: open, close
        if (attrs.direction && _.indexOf(['open', 'close'], attrs.direction) === -1) {
            return 'invalid direction';
        }
        // key: from Bandoneon.keys
        if (attrs.key && _.indexOf(keys, attrs.key) === -1) {
            return 'invalid key';
        }
        // mode: from Bandoneon.modes
        if (attrs.mode && !modes.hasOwnProperty(attrs.mode)) {
            return 'invalid mode';
        }
        return;
    }
});

export default new AppModel();
