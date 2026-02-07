import type { ProviderModule, Quote, SwapToken } from "./types"

const BASE = "https://api.jup.ag/swap/v1"

const TOKENS: SwapToken[] = [
	{
		address: "So11111111111111111111111111111111111111112",
		symbol: "SOL",
		decimals: 9,
		name: "Solana",
	},
	{
		address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
		symbol: "USDC",
		decimals: 6,
		name: "USD Coin",
	},
	{
		address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
		symbol: "USDT",
		decimals: 6,
		name: "Tether",
	},
	{
		address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
		symbol: "RAY",
		decimals: 6,
		name: "Raydium",
	},
	{
		address: "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL",
		symbol: "JTO",
		decimals: 9,
		name: "Jito",
	},
	{
		address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
		symbol: "JUP",
		decimals: 6,
		name: "Jupiter",
	},
	{
		address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
		symbol: "BONK",
		decimals: 5,
		name: "Bonk",
	},
]

function toSmallest(amount: string, decimals: number): string {
	const n = Number.parseFloat(amount)
	return Math.floor(n * 10 ** decimals).toString()
}

export const jupiter: ProviderModule = {
	tokens: () => TOKENS,

	quote: async ({ input, output, amount }) => {
		const lamports = toSmallest(amount, input.decimals)
		if (lamports === "0") return null

		const params = new URLSearchParams({
			inputMint: input.address,
			outputMint: output.address,
			amount: lamports,
			slippageBps: "50",
		})

		const res = await fetch(`${BASE}/quote?${params}`)
		if (!res.ok) return null
		const data = await res.json()

		const outputAmount = (Number(data.outAmount) / 10 ** output.decimals).toString()
		const inputNum = Number.parseFloat(amount)
		const outputNum = Number.parseFloat(outputAmount)

		return {
			provider: "jupiter",
			input,
			output,
			inputAmount: amount,
			outputAmount,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: data.routePlan?.[0]?.swapInfo?.label ?? "jupiter v6",
			fee: data.platformFee?.amount ?? "0",
			_raw: data,
		} as Quote & { _raw: any }
	},

	swap: async ({ quote, sender, signer }) => {
		const raw = (quote as any)._raw
		if (!raw) return { status: "error", message: "no quote data" }

		const res = await fetch(`${BASE}/swap`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				quoteResponse: raw,
				userPublicKey: sender,
				dynamicComputeUnitLimit: true,
				prioritizationFeeLamports: "auto",
			}),
		})

		if (!res.ok) return { status: "error", message: "swap request failed" }
		const data = await res.json()

		const tx = data.swapTransaction
		if (!tx || !signer) return { status: "error", message: "no transaction" }

		const { VersionedTransaction } = await import("@solana/web3.js")
		const buffer = Buffer.from(tx, "base64")
		const transaction = VersionedTransaction.deserialize(buffer)

		const signed = await signer.signTransaction(transaction)
		const { Connection } = await import("@solana/web3.js")
		const connection = new Connection("https://api.mainnet-beta.solana.com")
		const hash = await connection.sendRawTransaction(signed.serialize())

		return {
			status: "success" as const,
			hash,
			explorer: `https://solscan.io/tx/${hash}`,
		}
	},
}
