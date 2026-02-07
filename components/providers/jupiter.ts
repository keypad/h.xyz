import type { ProviderModule, SwapToken } from "./types"
import { toSmallest } from "./types"

const TOKENS: SwapToken[] = [
	{
		address: "So11111111111111111111111111111111111111112",
		symbol: "SOL",
		decimals: 9,
		name: "Solana",
		logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
	},
	{
		address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
		symbol: "USDC",
		decimals: 6,
		name: "USD Coin",
		logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
	},
	{
		address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
		symbol: "USDT",
		decimals: 6,
		name: "Tether",
		logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png",
	},
	{
		address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
		symbol: "JUP",
		decimals: 6,
		name: "Jupiter",
		logo: "https://static.jup.ag/jup/icon.png",
	},
	{
		address: "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL",
		symbol: "JTO",
		decimals: 9,
		name: "Jito",
		logo: "https://metadata.jito.network/token/jto/icon.png",
	},
	{
		address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
		symbol: "RAY",
		decimals: 6,
		name: "Raydium",
		logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
	},
	{
		address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
		symbol: "BONK",
		decimals: 5,
		name: "Bonk",
		logo: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
	},
	{
		address: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3",
		symbol: "PYTH",
		decimals: 6,
		name: "Pyth Network",
		logo: "https://pyth.network/token.png",
	},
	{
		address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
		symbol: "WIF",
		decimals: 6,
		name: "dogwifhat",
	},
	{
		address: "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof",
		symbol: "RENDER",
		decimals: 8,
		name: "Render Token",
	},
	{
		address: "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux",
		symbol: "HNT",
		decimals: 8,
		name: "Helium",
	},
	{
		address: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
		symbol: "ORCA",
		decimals: 6,
		name: "Orca",
		logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png",
	},
	{
		address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
		symbol: "mSOL",
		decimals: 9,
		name: "Marinade SOL",
		logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
	},
	{
		address: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
		symbol: "jitoSOL",
		decimals: 9,
		name: "Jito Staked SOL",
	},
	{
		address: "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ",
		symbol: "W",
		decimals: 6,
		name: "Wormhole",
	},
]

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
			restrictIntermediateTokens: "true",
		})

		const res = await fetch(`/api/jupiter?${params}`)
		if (!res.ok) return null
		const data = await res.json()

		if (!data.outAmount) return null

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
		}
	},

	swap: async ({ quote, sender, signer }) => {
		const raw = quote._raw as Record<string, any> | undefined
		if (!raw) return { status: "error", message: "no quote data" }

		const res = await fetch("/api/jupiter", {
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
