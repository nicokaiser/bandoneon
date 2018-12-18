import Backbone from 'backbone';

import Instrument from './instruments/bandoneon-aa142-orch';

export default Backbone.Model.extend({
    defaults: {
        variant: 'right-open',
        mode: null,
        tonic: null,
        name: null,
        instrument: Instrument
    },

    validate: function (attrs) {
        if (attrs.variant && !this.instrument.variants().includes(attrs.variants)) {
            return 'invalid variant';
        }
        return;
    }
});
