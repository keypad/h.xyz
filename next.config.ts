import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "raw.githubusercontent.com" },
			{ hostname: "assets.coingecko.com" },
			{ hostname: "avatars.githubusercontent.com" },
			{ hostname: "upload.wikimedia.org" },
			{ hostname: "altcoinsbox.com" },
			{ hostname: "solflare.com" },
			{ hostname: "backpack.app" },
			{ hostname: "cdn.jsdelivr.net" },
		],
	},
	headers: async () => [
		{
			source: "/(.*)",
			headers: [
				{ key: "X-Content-Type-Options", value: "nosniff" },
				{ key: "X-Frame-Options", value: "DENY" },
				{ key: "Referrer-Policy", value: "no-referrer" },
				{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
			],
		},
		{
			source: "/api/:path*",
			headers: [
				{ key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
				{ key: "X-Content-Type-Options", value: "nosniff" },
			],
		},
	],
}

export default nextConfig
