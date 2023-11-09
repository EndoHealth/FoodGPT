const withImage = require('next-images');

const nextConfig = {
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
		domains: [
			'images.unsplash.com',
			'picsum.photos',
			'y-english-tutor.s3.ap-northeast-2.amazonaws.com',
		],
	},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			net: false,
			tls: false,
		};

		return config;
	},
};

module.exports = withImage(nextConfig);
