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
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader"
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'app')
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: true, screw_ie8: true },
            comments: false
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
}
