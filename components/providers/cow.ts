import type { ProviderModule, Quote, SwapToken } from "./types"

const CHAINS: Record<number, string> = {
	1: "mainnet",
	100: "gnosis",
	42161: "arbitrum",
	8453: "base",
}

const TOKENS: SwapToken[] = [
	{
		address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
		symbol: "ETH",
		decimals: 18,
		name: "Ether",
		chainId: 1,
	},
	{
		address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		symbol: "USDC",
		decimals: 6,
		name: "USD Coin",
		chainId: 1,
	},
	{
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		symbol: "USDT",
		decimals: 6,
		name: "Tether",
		chainId: 1,
	},
	{
		address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
		symbol: "DAI",
		decimals: 18,
		name: "Dai",
		chainId: 1,
	},
	{
		address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
		symbol: "WBTC",
		decimals: 8,
		name: "Wrapped BTC",
		chainId: 1,
	},
	{
		address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
		symbol: "WETH",
		decimals: 18,
		name: "Wrapped Ether",
		chainId: 1,
	},
	{
		address: "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB",
		symbol: "COW",
		decimals: 18,
		name: "CoW Protocol",
		chainId: 1,
	},
]

const API = "https://api.cow.fi"

function toSmallest(amount: string, decimals: number): string {
	const n = Number.parseFloat(amount)
	return BigInt(
		Math.floor(n * 10 ** Math.min(decimals, 8)) * 10 ** Math.max(0, decimals - 8),
	).toString()
}

export const cow: ProviderModule = {
	tokens: () => TOKENS,

	quote: async ({ input, output, amount, sender }) => {
		const chainId = (input.chainId as number) || 1
		const chain = CHAINS[chainId]
		if (!chain) return null

		const sellAmount = toSmallest(amount, input.decimals)
		if (sellAmount === "0") return null

		const sellToken =
			input.symbol === "ETH" ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : input.address
		const buyToken =
			output.symbol === "ETH" ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" : output.address

		const res = await fetch(`${API}/${chain}/api/v1/quote`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				sellToken,
				buyToken,
				sellAmountBeforeFee: sellAmount,
				kind: "sell",
				from: sender || "0x0000000000000000000000000000000000000000",
				receiver: sender || "0x0000000000000000000000000000000000000000",
				validTo: Math.floor(Date.now() / 1000) + 600,
				appData: "0x0000000000000000000000000000000000000000000000000000000000000000",
			}),
		})

		if (!res.ok) return null
		const data = await res.json()

		const outputAmount = (Number(BigInt(data.quote.buyAmount)) / 10 ** output.decimals).toString()
		const inputNum = Number.parseFloat(amount)
		const outputNum = Number.parseFloat(outputAmount)

		return {
			provider: "cow",
			input,
			output,
			inputAmount: amount,
			outputAmount,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: "cow batch auction",
			fee: (Number(BigInt(data.quote.feeAmount)) / 10 ** input.decimals).toFixed(6),
			_raw: data,
		} as Quote & { _raw: any }
	},

	swap: async ({ quote, sender, signer }) => {
		const raw = (quote as any)._raw
		if (!raw || !signer) return { status: "error", message: "missing data" }

		const chainId = (quote.input.chainId as number) || 1
		const chain = CHAINS[chainId]
		if (!chain) return { status: "error", message: "unsupported chain" }

		const order = raw.quote
		const signature = await signer.signTypedData({
			domain: {
				name: "Gnosis Protocol",
				version: "v2",
				chainId,
				verifyingContract: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
			},
			types: {
				Order: [
					{ name: "sellToken", type: "address" },
					{ name: "buyToken", type: "address" },
					{ name: "receiver", type: "address" },
					{ name: "sellAmount", type: "uint256" },
					{ name: "buyAmount", type: "uint256" },
					{ name: "validTo", type: "uint32" },
					{ name: "appData", type: "bytes32" },
					{ name: "feeAmount", type: "uint256" },
					{ name: "kind", type: "string" },
					{ name: "partiallyFillable", type: "bool" },
					{ name: "sellTokenBalance", type: "string" },
					{ name: "buyTokenBalance", type: "string" },
				],
			},
			primaryType: "Order",
			message: order,
		})

		const res = await fetch(`${API}/${chain}/api/v1/orders`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...order,
				signature,
				signingScheme: "eip712",
				from: sender,
			}),
		})

		if (!res.ok) return { status: "error", message: "order submission failed" }
		const uid = await res.json()

		return {
			status: "success" as const,
			hash: uid,
			explorer: `https://explorer.cow.fi/orders/${uid}`,
		}
	},
}
