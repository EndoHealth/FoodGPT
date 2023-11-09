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
	env: {
		SUPABASE_KEY: process.env.SUPABASE_KEY,
		SUPABASE_URL: process.env.SUPABASE_URL,
	},
};

module.exports = withImage(nextConfig);
