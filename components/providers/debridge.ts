import type { ProviderModule, Quote, SwapToken } from "./types"

const CHAINS = [
	{ id: 1, name: "ethereum" },
	{ id: 56, name: "bsc" },
	{ id: 137, name: "polygon" },
	{ id: 42161, name: "arbitrum" },
	{ id: 10, name: "optimism" },
	{ id: 8453, name: "base" },
	{ id: 7565164, name: "solana" },
]

const EVM_TOKENS: SwapToken[] = [
	{
		address: "0x0000000000000000000000000000000000000000",
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
		address: "0x0000000000000000000000000000000000000000",
		symbol: "ETH",
		decimals: 18,
		name: "Ether",
		chainId: 42161,
	},
	{
		address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
		symbol: "USDC",
		decimals: 6,
		name: "USD Coin",
		chainId: 42161,
	},
]

const SOL_TOKENS: SwapToken[] = [
	{
		address: "So11111111111111111111111111111111111111112",
		symbol: "SOL",
		decimals: 9,
		name: "Solana",
		chainId: 7565164,
	},
	{
		address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
		symbol: "USDC",
		decimals: 6,
		name: "USD Coin",
		chainId: 7565164,
	},
]

function toSmallest(amount: string, decimals: number): string {
	const n = Number.parseFloat(amount)
	return Math.floor(n * 10 ** decimals).toString()
}

export const debridge: ProviderModule = {
	tokens: (chainId) => {
		if (chainId === 7565164 || chainId === "7565164") return SOL_TOKENS
		return EVM_TOKENS
	},

	quote: async ({ input, output, amount, sender, destChainId }) => {
		const srcChainId = input.chainId || 1
		const dstChainId = destChainId || output.chainId || 1
		const smallAmount = toSmallest(amount, input.decimals)
		if (smallAmount === "0") return null

		const params = new URLSearchParams({
			srcChainId: srcChainId.toString(),
			srcChainTokenIn: input.address,
			srcChainTokenInAmount: smallAmount,
			dstChainId: dstChainId.toString(),
			dstChainTokenOut: output.address,
			prependOperatingExpenses: "true",
		})

		if (sender) params.set("senderAddress", sender)

		const res = await fetch(`/api/debridge?${params}`)
		if (!res.ok) return null
		const data = await res.json()

		if (!data.estimation) return null

		const outputAmount = (
			Number(
				data.estimation.dstChainTokenOut?.amount ??
					data.estimation.costsDetails?.[0]?.amount ??
					"0",
			) /
			10 ** output.decimals
		).toString()

		const inputNum = Number.parseFloat(amount)
		const outputNum = Number.parseFloat(outputAmount)

		return {
			provider: "debridge",
			input,
			output,
			inputAmount: amount,
			outputAmount,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: `${CHAINS.find((c) => c.id === Number(srcChainId))?.name ?? "?"} -> ${CHAINS.find((c) => c.id === Number(dstChainId))?.name ?? "?"}`,
			_raw: data,
		} as Quote & { _raw: any }
	},

	swap: async ({ quote, signer }) => {
		const raw = (quote as any)._raw
		if (!raw?.tx || !signer) return { status: "error", message: "missing data" }

		const hash = await signer.sendTransaction({
			to: raw.tx.to,
			data: raw.tx.data,
			value: BigInt(raw.tx.value || "0"),
			chainId: Number(quote.input.chainId || 1),
		})

		return {
			status: "success" as const,
			hash,
			explorer: `https://app.debridge.finance/order?orderId=${hash}`,
		}
	},
}

export const DEBRIDGE_CHAINS = CHAINS
