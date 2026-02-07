import type { ProviderModule, SwapToken } from "./types"
import { toSmallest } from "./types"

const CHAINS = [
	{ id: 1, name: "ethereum" },
	{ id: 56, name: "bsc" },
	{ id: 137, name: "polygon" },
	{ id: 42161, name: "arbitrum" },
	{ id: 10, name: "optimism" },
	{ id: 8453, name: "base" },
	{ id: 7565164, name: "solana" },
]

const TOKENS: SwapToken[] = [
	{
		address: "0x0000000000000000000000000000000000000000",
		symbol: "ETH",
		decimals: 18,
		name: "ETH (ethereum)",
		chainId: 1,
	},
	{
		address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
		symbol: "USDC",
		decimals: 6,
		name: "USDC (arbitrum)",
		chainId: 42161,
	},
	{
		address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		symbol: "USDC",
		decimals: 6,
		name: "USDC (ethereum)",
		chainId: 1,
	},
	{
		address: "0x0000000000000000000000000000000000000000",
		symbol: "ETH",
		decimals: 18,
		name: "ETH (arbitrum)",
		chainId: 42161,
	},
	{
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		symbol: "USDT",
		decimals: 6,
		name: "USDT (ethereum)",
		chainId: 1,
	},
	{
		address: "0x0000000000000000000000000000000000000000",
		symbol: "ETH",
		decimals: 18,
		name: "ETH (base)",
		chainId: 8453,
	},
	{
		address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
		symbol: "USDC",
		decimals: 6,
		name: "USDC (base)",
		chainId: 8453,
	},
	{
		address: "0x0000000000000000000000000000000000000000",
		symbol: "ETH",
		decimals: 18,
		name: "ETH (optimism)",
		chainId: 10,
	},
	{
		address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
		symbol: "USDC",
		decimals: 6,
		name: "USDC (optimism)",
		chainId: 10,
	},
	{
		address: "0x0000000000000000000000000000000000000000",
		symbol: "BNB",
		decimals: 18,
		name: "BNB (bsc)",
		chainId: 56,
	},
	{
		address: "0x0000000000000000000000000000000000000000",
		symbol: "MATIC",
		decimals: 18,
		name: "MATIC (polygon)",
		chainId: 137,
	},
	{
		address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
		symbol: "USDC",
		decimals: 6,
		name: "USDC (polygon)",
		chainId: 137,
	},
]

export const debridge: ProviderModule = {
	tokens: () => TOKENS,

	quote: async ({ input, output, amount, sender }) => {
		const srcChainId = input.chainId || 1
		const dstChainId = output.chainId || 42161
		const smallAmount = toSmallest(amount, input.decimals)
		if (smallAmount === "0") return null

		if (srcChainId === dstChainId) return null

		const params = new URLSearchParams({
			srcChainId: srcChainId.toString(),
			srcChainTokenIn: input.address,
			srcChainTokenInAmount: smallAmount,
			dstChainId: dstChainId.toString(),
			dstChainTokenOut: output.address,
			dstChainTokenOutAmount: "auto",
			prependOperatingExpenses: "true",
		})

		if (sender) {
			params.set("senderAddress", sender)
			params.set("srcChainOrderAuthorityAddress", sender)
			params.set("dstChainTokenOutRecipient", sender)
			params.set("dstChainOrderAuthorityAddress", sender)
		}

		const res = await fetch(`/api/debridge?${params}`)
		if (!res.ok) return null
		const data = await res.json()

		if (data.error || data.errorCode) return null

		const estimation = data.estimation
		if (!estimation) return null

		const outAmount = estimation.dstChainTokenOut?.amount
		if (!outAmount) return null

		const outputAmount = (Number(outAmount) / 10 ** output.decimals).toString()
		const inputNum = Number.parseFloat(amount)
		const outputNum = Number.parseFloat(outputAmount)

		const srcName = CHAINS.find((c) => c.id === Number(srcChainId))?.name ?? "?"
		const dstName = CHAINS.find((c) => c.id === Number(dstChainId))?.name ?? "?"

		return {
			provider: "debridge",
			input,
			output,
			inputAmount: amount,
			outputAmount,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: `${srcName} -> ${dstName}`,
			_raw: data,
		}
	},

	swap: async ({ quote, signer }) => {
		const raw = quote._raw as Record<string, any> | undefined
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
