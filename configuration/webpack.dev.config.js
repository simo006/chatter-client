const path = require('path');

module.exports = {
    mode: 'development',
    entry: '/js/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '../dist/js'),
    },
    devtool: 'inline-source-map',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 300,
        ignored: /node_modules/,
    },
};