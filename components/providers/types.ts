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
	}) => Promise<Quote | null>
	swap: (params: { quote: Quote; sender: string; signer: any }) => Promise<SwapResult>
}
