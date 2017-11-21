import _ from 'lodash';
import Backbone from 'backbone';

const AppModel = Backbone.Model.extend({
    defaults: {
        variant: 'right-open',
        mode: null,
        tonic: null,
        name: null
    },

    validate: function (attrs) {
        /*
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
        */
        return;
    }
});

export default new AppModel();
