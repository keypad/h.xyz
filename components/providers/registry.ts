import type { Provider } from "./types"

export const providers: Provider[] = [
	{
		id: "jupiter",
		name: "jupiter",
		tag: "solana dex aggregator",
		color: "#9945FF",
		chains: ["solana"],
		crosschain: false,
		url: "https://jup.ag",
	},
	{
		id: "cow",
		name: "cow protocol",
		tag: "mev protected",
		color: "#012D72",
		chains: ["evm"],
		crosschain: false,
		url: "https://cow.fi",
	},
	{
		id: "debridge",
		name: "debridge",
		tag: "cross-chain",
		color: "#6944BA",
		chains: ["evm", "solana"],
		crosschain: true,
		url: "https://debridge.finance",
	},
	{
		id: "houdini",
		name: "houdini swap",
		tag: "privacy route",
		color: "#7B2FBF",
		chains: ["evm", "solana"],
		crosschain: true,
		url: "https://houdiniswap.com",
	},
	{
		id: "uniswap",
		name: "uniswap",
		tag: "on-chain amm",
		color: "#FF007A",
		chains: ["evm"],
		crosschain: false,
		url: "https://uniswap.org",
	},
]

export function provider(id: string) {
	return providers.find((p) => p.id === id)
}
