export type ChainType = "evm" | "solana"

export type Provider = {
	id: string
	name: string
	color: string
	chains: ChainType[]
	crosschain: boolean
	url: string
}

export type SwapToken = {
	address: string
	symbol: string
	decimals: number
	name: string
	logo?: string
	chainId?: number | string
}

export type Quote = {
	provider: string
	input: SwapToken
	output: SwapToken
	inputAmount: string
	outputAmount: string
	rate: number
	fee?: string
	route?: string
	estimatedGas?: string
	_raw?: unknown
}

export function toSmallest(amount: string, decimals: number): string {
	const n = Number.parseFloat(amount)
	if (decimals <= 8) return Math.floor(n * 10 ** decimals).toString()
	return BigInt(
		Math.floor(n * 10 ** Math.min(decimals, 8)) * 10 ** Math.max(0, decimals - 8),
	).toString()
}

export type SwapResult = {
	status: "pending" | "success" | "error"
	hash?: string
	explorer?: string
	message?: string
}

export type ProviderModule = {
	tokens: (chainId?: number | string) => SwapToken[]
	quote: (params: {
		input: SwapToken
		output: SwapToken
		amount: string
		chainId?: number | string
		destChainId?: number | string
		sender?: string
		slippage?: number
	}) => Promise<Quote | null>
	swap: (params: {
		quote: Quote
		sender: string
		signer: any
		slippage?: number
	}) => Promise<SwapResult>
}
