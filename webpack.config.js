var HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './scripts/app.js',
	image: './scripts/image.js',
	sw: './sw.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
	  template: 'index.html',
	  favicon: "./favicon.ico"
	}),
	new copyWebpackPlugin(
		{
			patterns: [
				{ from: 'assets', to: 'assets'},
				{ from: 'styles', to: 'styles'},
				{ from: 'manifest.json', to: 'manifest.json'}
			]	
		},
	)
  ],
};
