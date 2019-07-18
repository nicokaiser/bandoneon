const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: __dirname,
    entry: './app/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'app')]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            Popper: ['popper.js', 'default']
        })
    ]
};
