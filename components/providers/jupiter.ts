import { SOLANA_TOKENS } from "./solana"
import type { ProviderModule, SwapToken } from "./types"
import { toSmallest } from "./types"

let cached: SwapToken[] | null = null
let fetching = false

function mapToken(t: any): SwapToken {
	return {
		address: t.address,
		symbol: t.symbol,
		decimals: t.decimals ?? 9,
		name: t.name || t.symbol,
		logo: t.logoURI,
	}
}

function fetchTokens() {
	if (fetching || cached) return
	fetching = true
	fetch("/api/jupiter?action=tokens")
		.then((res) => (res.ok ? res.json() : Promise.reject()))
		.then((data: any[]) => {
			cached = data.map(mapToken)
		})
		.catch(() => {})
		.finally(() => {
			fetching = false
		})
}

export const jupiter: ProviderModule = {
	tokens: () => {
		fetchTokens()
		return cached || SOLANA_TOKENS
	},

	quote: async ({ input, output, amount, slippage }) => {
		const lamports = toSmallest(amount, input.decimals)
		if (lamports === "0") return null

		const bps = Math.round((slippage ?? 0.5) * 100)
		const params = new URLSearchParams({
			inputMint: input.address,
			outputMint: output.address,
			amount: lamports,
			slippageBps: bps.toString(),
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
