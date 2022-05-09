module.exports = {
	transpileDependencies: ["vuetify"],
	devServer: {
		port: 8080,
		host: "0.0.0.0",
	},
	pwa: {
		themeColor: "#0c0d10",
		msTileColor: "#000000",
		iconPaths: {
			msTileImage: "img/mstile-150x150.png",
		},
	},
};
