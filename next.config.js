const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
		fontLoaders: [
			{
				loader: '@next/font/google',
				options: { subsets: ['latin'] },
			},
		],
	},
	async headers() {
		return [
			{
				source: '/(en|de|fr)/:path*',
				headers: [
					{
						// Cache for 30 minutes, but allow to send
						// cached responses for up to 1 hour
						key: 'cache-control',
						value: 'public, s-maxage=1800, stale-while-revalidate=3600',
					},
				],
			},
		]
	},
}

module.exports = withNextIntl(nextConfig)
