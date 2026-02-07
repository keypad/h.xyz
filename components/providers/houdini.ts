import { tokenIcon } from "./icons"
import type { ProviderModule, SwapToken } from "./types"

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets"

const POPULAR: SwapToken[] = [
	{ address: "ETH", symbol: "ETH", decimals: 18, name: "Ethereum" },
	{ address: "BTC", symbol: "BTC", decimals: 8, name: "Bitcoin" },
	{ address: "SOL", symbol: "SOL", decimals: 9, name: "Solana" },
	{ address: "XMR", symbol: "XMR", decimals: 12, name: "Monero" },
	{
		address: "USDC",
		symbol: "USDC",
		decimals: 6,
		name: "USD Coin",
		logo: `${TW}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`,
	},
	{
		address: "USDT",
		symbol: "USDT",
		decimals: 6,
		name: "Tether",
		logo: `${TW}/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png`,
	},
	{
		address: "DAI",
		symbol: "DAI",
		decimals: 18,
		name: "Dai",
		logo: `${TW}/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png`,
	},
	{ address: "MATIC", symbol: "MATIC", decimals: 18, name: "Polygon" },
].map((t) => ({ ...t, logo: t.logo || tokenIcon(t) }))

function amount(data: Record<string, unknown>): string | null {
	const v = data.amountOut ?? data.estimated_amount ?? data.amount_out
	return v != null ? String(v) : null
}

export const houdini: ProviderModule = {
	tokens: () => POPULAR,

	quote: async ({ input, output, amount: raw }) => {
		const n = Number.parseFloat(raw)
		if (!n || n <= 0) return null

		const params = new URLSearchParams({
			from: input.symbol,
			to: output.symbol,
			amount: raw,
		})

		const res = await fetch(`/api/houdini?action=quote&${params}`)
		if (!res.ok) return null

		const data = await res.json()
		const out = amount(data)
		if (!out) return null

		const inputNum = Number.parseFloat(raw)
		const outputNum = Number.parseFloat(out)

		return {
			provider: "houdini",
			input,
			output,
			inputAmount: raw,
			outputAmount: out,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: "houdini privacy route",
			_raw: data,
		}
	},

	swap: async ({ quote, sender }) => {
		const res = await fetch("/api/houdini?action=exchange", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				from: quote.input.symbol,
				to: quote.output.symbol,
				amount: quote.inputAmount,
				addressTo: sender,
				anonymous: true,
			}),
		})

		if (!res.ok) return { status: "error", message: "exchange failed" }
		const data = await res.json()

		const id = data.houdiniId || data.id
		if (!id) return { status: "error", message: "no exchange id" }

		const deposit = data.senderAddress || data.payinAddress || ""
		const eta = data.eta ? `${data.eta}m` : ""

		return {
			status: "success" as const,
			hash: id,
			message: deposit
				? `send ${quote.inputAmount} ${quote.input.symbol} to ${deposit}${eta ? ` (${eta})` : ""}`
				: id,
			explorer: id,
		}
	},
}
