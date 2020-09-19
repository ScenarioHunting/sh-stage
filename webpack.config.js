const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const { json } = require('express');

module.exports = {
	mode: 'production', // Tip! compile in 'production' mode before publish

	// Tip! Just delete not using files, but main.ts is required
	entry: {
		index: './src/index.ts',
		sidebar: './src/sidebar.tsx', // Example! It works with React.
		modal: './src/modal.ts'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "less-loader"
				}],
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
				  'file-loader',
				]
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.less', '.css','.svg']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		// new webpack.DefinePlugin({"process.env.NODE_ENV":JSON.stringify("development")})
	]
}
