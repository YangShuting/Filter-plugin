var webpack = require('webpack');

module.exports = {
	entry: './main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
        		test: /\.css$/,
        		loader: 'style-loader!css-loader'//添加对样式表的处理
      		}, 
      		{
		      	test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
		      	loader: "url-loader?limit=10000&mimetype=application/font-woff"
		    }, 
		    {
		      	test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
		      	loader: "url-loader?limit=10000&mimetype=application/font-woff"
		    }, 
		    {
		     	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		      	loader: "url-loader?limit=10000&mimetype=application/octet-stream"
		    }, 
		    {
		      	test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		      	loader: "file-loader"
		    }, 
		    {
		      	test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		      	loader: "url-loader?limit=10000&mimetype=image/svg+xml"
		    }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
}