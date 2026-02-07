export type Token = { id: string; symbol: string; color: string }

export const tokens: Token[] = [
	{ id: "ethereum", symbol: "ETH", color: "#627EEA" },
	{ id: "bitcoin", symbol: "BTC", color: "#F7931A" },
	{ id: "solana", symbol: "SOL", color: "#9945FF" },
	{ id: "monero", symbol: "XMR", color: "#FF6600" },
	{ id: "usd-coin", symbol: "USDC", color: "#2775CA" },
]

function Logo({ bg, children }: { bg: string; children: React.ReactNode }) {
	return (
		<svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5">
			<circle cx="16" cy="16" r="16" fill={bg} />
			{children}
		</svg>
	)
}

export function TokenLogo({ token }: { token: Token }) {
	switch (token.symbol) {
		case "ETH":
			return (
				<Logo bg="#627EEA">
					<path d="M16.5 4v8.87l7.5 3.35z" fill="#fff" fillOpacity=".6" />
					<path d="M16.5 4L9 16.22l7.5-3.35z" fill="#fff" />
					<path d="M16.5 21.97v6.03L24 17.62z" fill="#fff" fillOpacity=".6" />
					<path d="M16.5 28v-6.03L9 17.62z" fill="#fff" />
					<path d="M16.5 20.57l7.5-4.35-7.5-3.35z" fill="#fff" fillOpacity=".2" />
					<path d="M9 16.22l7.5 4.35v-7.7z" fill="#fff" fillOpacity=".6" />
				</Logo>
			)
		case "BTC":
			return (
				<Logo bg="#F7931A">
					<path
						d="M22.5 14.2c.3-2.1-1.3-3.2-3.5-4l.7-2.8-1.7-.4-.7 2.7c-.5-.1-1-.2-1.4-.3l.7-2.8-1.7-.4-.7 2.8-1.2-.3-2.3-.6-.5 1.8s1.3.3 1.2.3c.7.2.8.6.8 1l-2 7.9c-.1.3-.4.6-.9.5l-1.2-.3-.9 2 2.3.6 1.2.3-.7 2.9 1.7.4.7-2.9c.5.1 1 .2 1.4.3l-.7 2.8 1.7.4.7-2.9c3 .6 5.3.3 6.2-2.4.8-2.1 0-3.4-1.6-4.2 1.2-.3 2.1-1.1 2.3-2.8zm-4.2 4.6c-.6 2.2-4.3 1-5.5.7l1-4c1.2.3 5.1 1 4.5 3.3zm.5-5.5c-.5 2-3.6 1-4.6.7l.9-3.5c1 .3 4.2.8 3.7 2.8z"
						fill="#fff"
					/>
				</Logo>
			)
		case "SOL":
			return (
				<Logo bg="#000">
					<defs>
						<linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#9945FF" />
							<stop offset="100%" stopColor="#14F195" />
						</linearGradient>
					</defs>
					<circle cx="16" cy="16" r="16" fill="url(#sg)" />
					<g fill="#fff">
						<path d="M10 20.8h9.8l2.2-2.2H10z" />
						<path d="M10 13.4h9.8l2.2 2.2H10z" />
						<path d="M22 11.2H12.2L10 13.4h12z" />
					</g>
				</Logo>
			)
		case "XMR":
			return (
				<Logo bg="#FF6600">
					<path d="M16 8l-5.5 10.5H8v2h4.2v-2l3.8-7.2 3.8 7.2v2H24v-2h-2.5z" fill="#fff" />
				</Logo>
			)
		case "USDC":
			return (
				<Logo bg="#2775CA">
					<path
						d="M20.2 18.3c0-2-1.2-2.7-3.5-3-1.6-.3-2.1-.5-2.1-1.2s.5-1.1 1.5-1.1c.9 0 1.7.2 2.5.5.1.1.3 0 .3-.1v-1.2c0-.1-.1-.2-.2-.3-.7-.2-1.4-.4-2.2-.4v-1.4c0-.1-.1-.2-.2-.2h-1c-.1 0-.2.1-.2.2v1.4c-1.6.2-2.6 1.2-2.6 2.6 0 1.9 1.2 2.5 3.4 2.9 1.5.3 2.2.6 2.2 1.3s-.6 1.2-1.6 1.3c-1 .1-2-.2-2.9-.6-.1-.1-.3 0-.3.1v1.2c0 .1.1.2.2.3.8.3 1.7.5 2.6.5v1.5c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-1.5c1.7-.3 2.7-1.3 2.7-2.8z"
						fill="#fff"
					/>
				</Logo>
			)
		default:
			return (
				<span
					className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
					style={{ background: token.color }}
				>
					{token.symbol[0]}
				</span>
			)
	}
}

export function fmt(n: number) {
	return n.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}
