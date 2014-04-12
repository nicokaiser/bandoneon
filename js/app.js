requirejs.config({
    baseUrl: 'js',
    paths: {
        app: './app',
        backbone: 'lib/backbone-min',
        bootstrap: 'lib/bootstrap',
        jquery: 'lib/jquery-2.0.3.min',
        raphael: 'lib/raphael-min',
        underscore: 'lib/underscore-min'
    },
    shim: {
        bootstrap: ['jquery'],
        raphael: {
            exports: 'Raphael'
        }
    }
});

requirejs(['app/main']);
