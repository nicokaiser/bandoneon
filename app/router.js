import Backbone from 'backbone';

import model from './model';

var AppRouter = Backbone.Router.extend({
    routes: {
        '!/:variant/scale/:tonic/:name': 'selectScale',
        '!/:variant/chord/:tonic/:name': 'selectChord',
        '!/:variant': 'selectLayout'
    },
    selectLayout: (variant) => {
        model.set({ variant })
    },
    selectScale: (variant, tonic, name) => {
        model.set({ variant, tonic, name, mode: 'scale' })
    },
    selectChord: (variant, tonic, name) => {
        model.set({ variant, tonic, name, mode: 'chord' })
    }
});
export default new AppRouter();
