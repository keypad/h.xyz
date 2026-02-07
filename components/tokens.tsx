import Image from "next/image"

export type Token = { id: string; symbol: string; color: string; logo: string }

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains"

export const tokens: Token[] = [
	{
		id: "ethereum",
		symbol: "ETH",
		color: "#627EEA",
		logo: `${TW}/ethereum/info/logo.png`,
	},
	{
		id: "bitcoin",
		symbol: "BTC",
		color: "#F7931A",
		logo: `${TW}/bitcoin/info/logo.png`,
	},
	{
		id: "solana",
		symbol: "SOL",
		color: "#9945FF",
		logo: `${TW}/solana/info/logo.png`,
	},
	{
		id: "monero",
		symbol: "XMR",
		color: "#FF6600",
		logo: "https://assets.coingecko.com/coins/images/69/small/monero_logo.png",
	},
	{
		id: "usd-coin",
		symbol: "USDC",
		color: "#2775CA",
		logo: `${TW}/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`,
	},
]

export function TokenLogo({ token }: { token: Token }) {
	return (
		<Image
			src={token.logo}
			alt=""
			width={20}
			height={20}
			className="h-5 w-5 rounded-full"
			unoptimized
		/>
	)
}

export function fmt(n: number) {
	return n.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}
