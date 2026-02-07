import type { Provider } from "./types"

export const providers: Provider[] = [
	{
		id: "jupiter",
		name: "jupiter",
		color: "#9945FF",
		chains: ["solana"],
		crosschain: false,
		url: "https://jup.ag",
	},
	{
		id: "cow",
		name: "cow protocol",
		color: "#012D72",
		chains: ["evm"],
		crosschain: false,
		url: "https://cow.fi",
	},
	{
		id: "debridge",
		name: "debridge",
		color: "#6944BA",
		chains: ["evm", "solana"],
		crosschain: true,
		url: "https://debridge.finance",
	},
	{
		id: "houdini",
		name: "houdini swap",
		color: "#7B2FBF",
		chains: ["evm", "solana"],
		crosschain: true,
		url: "https://houdiniswap.com",
	},
	{
		id: "uniswap",
		name: "uniswap",
		color: "#FF007A",
		chains: ["evm"],
		crosschain: false,
		url: "https://uniswap.org",
	},
]

export function provider(id: string) {
	return providers.find((p) => p.id === id)
}
