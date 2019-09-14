const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
	const config = {
		entry: "./src/index.js",
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "public")
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /node_modules/,
					use: "babel-loader"
				}, {
					test: /\.s[ac]ss$/i,
					exclude: /node_modules/,
					use: ["style-loader", "css-loader", "sass-loader"]
				}, {
					test: /\.(png|svg)$/i,
					exclude: /node_modules/,
					loader: "file-loader",
					options: {
						name: '[name].[ext]',
					}
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				title: "BoxMockup",
				meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
				},
				favicon: "./template/favicon.ico",
				template: "./template/index.html"
			})
		],
		resolve: {
			extensions: [
				".js"
			],
			alias: {
				"@Styles": path.resolve(__dirname, "src/Styles")
			}
		}
	};

	switch (options.mode) {
		case "production":
			config.mode = "production";
			break;
		case "development":
			config.mode = "development";
			config.devServer = {
				port: 3000,
				contentBase: path.resolve(__dirname, "public"),
				compress: true,
				watchContentBase: true
			}
			break;
		default:
	}

	return config;
}