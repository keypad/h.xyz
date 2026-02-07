import type { ProviderModule, Quote, SwapToken } from "./types"

const POPULAR: SwapToken[] = [
	{ address: "ETH", symbol: "ETH", decimals: 18, name: "Ethereum" },
	{ address: "BTC", symbol: "BTC", decimals: 8, name: "Bitcoin" },
	{ address: "SOL", symbol: "SOL", decimals: 9, name: "Solana" },
	{ address: "XMR", symbol: "XMR", decimals: 12, name: "Monero" },
	{ address: "USDC", symbol: "USDC", decimals: 6, name: "USD Coin" },
	{ address: "USDT", symbol: "USDT", decimals: 6, name: "Tether" },
	{ address: "DAI", symbol: "DAI", decimals: 18, name: "Dai" },
	{ address: "MATIC", symbol: "MATIC", decimals: 18, name: "Polygon" },
]

export const houdini: ProviderModule = {
	tokens: () => POPULAR,

	quote: async ({ input, output, amount }) => {
		const n = Number.parseFloat(amount)
		if (!n || n <= 0) return null

		const params = new URLSearchParams({
			from: input.symbol,
			to: output.symbol,
			amount: amount,
		})

		const res = await fetch(`/api/houdini?action=quote&${params}`)
		if (!res.ok) return null
		const data = await res.json()

		if (!data.estimated_amount) return null

		const outputAmount = data.estimated_amount.toString()
		const inputNum = Number.parseFloat(amount)
		const outputNum = Number.parseFloat(outputAmount)

		return {
			provider: "houdini",
			input,
			output,
			inputAmount: amount,
			outputAmount,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: "houdini privacy route",
			_raw: data,
		} as Quote & { _raw: any }
	},

	swap: async ({ quote, sender }) => {
		const params = new URLSearchParams({
			from: quote.input.symbol,
			to: quote.output.symbol,
			amount: quote.inputAmount,
			address: sender,
		})

		const res = await fetch(`/api/houdini?action=exchange&${params}`)
		if (!res.ok) return { status: "error", message: "exchange failed" }
		const data = await res.json()

		if (!data.id) return { status: "error", message: "no exchange id" }

		return {
			status: "success" as const,
			hash: data.id,
			message: `send ${quote.inputAmount} ${quote.input.symbol} to ${data.payinAddress}`,
			explorer: data.id,
		}
	},
}
