requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        backbone: 'backbone-min',
        bootstrap: 'bootstrap',
        jquery: 'jquery-2.0.3.min',
        raphael: 'raphael-min',
        underscore: 'underscore-min'
    },
    shim: {
        bootstrap: ['jquery'],
        raphael: {
            exports: 'Raphael'
        }
    }
});

requirejs(['app/main']);
