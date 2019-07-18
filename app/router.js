import Backbone from 'backbone';

export default Backbone.Router.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    routes: {
        '!/:variant/scale/:tonic/:name': 'selectScale',
        '!/:variant/chord/:tonic/:name': 'selectChord',
        '!/:variant': 'selectLayout'
    },
    selectLayout: function(variant) {
        this.model.set({ variant });
    },
    selectScale: function(variant, tonic, name) {
        this.model.set({ variant, tonic, name, mode: 'scale' });
    },
    selectChord: function(variant, tonic, name) {
        this.model.set({ variant, tonic, name, mode: 'chord' });
    }
});
