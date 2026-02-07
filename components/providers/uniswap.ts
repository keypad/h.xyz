import type { ProviderModule, SwapToken } from "./types"
import { toSmallest } from "./types"
import {
	EXPLORER_BY_CHAIN,
	QUOTER_BY_CHAIN,
	ROUTER_BY_CHAIN,
	RPC_BY_CHAIN,
	UNI_TOKENS,
	WETH_BY_CHAIN,
} from "./tokens/uniswap"

function isNative(token: SwapToken): boolean {
	return token.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
}

function wrapped(token: SwapToken, chainId: number): string {
	if (isNative(token)) return WETH_BY_CHAIN[chainId] ?? WETH_BY_CHAIN[1]
	return token.address
}

async function viemChain(chainId: number) {
	const chains = await import("viem/chains")
	const map: Record<number, any> = {
		1: chains.mainnet,
		137: chains.polygon,
		42161: chains.arbitrum,
		10: chains.optimism,
		8453: chains.base,
	}
	return map[chainId] ?? chains.mainnet
}

export const uniswap: ProviderModule = {
	tokens: (chainId) => {
		const id = Number(chainId) || 1
		return UNI_TOKENS.filter((t) => t.chainId === id)
	},

	quote: async ({ input, output, amount }) => {
		const chainId = (input.chainId as number) || 1
		const sellAmount = toSmallest(amount, input.decimals)
		if (sellAmount === "0") return null

		const tokenIn = wrapped(input, chainId)
		const tokenOut = wrapped(output, chainId)
		const quoter = QUOTER_BY_CHAIN[chainId] ?? QUOTER_BY_CHAIN[1]

		try {
			const { encodeFunctionData, createPublicClient, http, parseAbi, decodeFunctionResult } =
				await import("viem")

			const chain = await viemChain(chainId)
			const rpc = RPC_BY_CHAIN[chainId]
			const client = createPublicClient({
				chain,
				transport: http(rpc),
			})

			const quoterAbi = parseAbi([
				"function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) external returns (uint256 amountOut)",
			])

			const data = encodeFunctionData({
				abi: quoterAbi,
				functionName: "quoteExactInputSingle",
				args: [
					tokenIn as `0x${string}`,
					tokenOut as `0x${string}`,
					3000,
					BigInt(sellAmount),
					BigInt(0),
				],
			})

			const result = await client.call({
				to: quoter as `0x${string}`,
				data,
			})

			if (!result.data) return null

			const decoded = decodeFunctionResult({
				abi: quoterAbi,
				functionName: "quoteExactInputSingle",
				data: result.data,
			})
			const amountOut = decoded as bigint

			const outputAmount = (Number(amountOut) / 10 ** output.decimals).toString()
			const inputNum = Number.parseFloat(amount)
			const outputNum = Number.parseFloat(outputAmount)

			return {
				provider: "uniswap",
				input,
				output,
				inputAmount: amount,
				outputAmount,
				rate: inputNum > 0 ? outputNum / inputNum : 0,
				route: "uniswap v3",
				estimatedGas: "150000",
				_raw: { tokenIn, tokenOut, sellAmount, fee: 3000, chainId },
			}
		} catch {
			return null
		}
	},

	swap: async ({ quote, sender, signer, slippage: slippagePct }) => {
		const raw = quote._raw as Record<string, any> | undefined
		if (!raw || !signer) return { status: "error", message: "missing data" }

		const chainId = raw.chainId || 1
		const router = ROUTER_BY_CHAIN[chainId] ?? ROUTER_BY_CHAIN[1]
		const explorer = EXPLORER_BY_CHAIN[chainId] ?? EXPLORER_BY_CHAIN[1]

		const { encodeFunctionData, parseAbi } = await import("viem")

		const routerAbi = parseAbi([
			"function exactInputSingle((address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)",
		])

		const tolerance = 1 - (slippagePct ?? 0.5) / 100
		const minOut = BigInt(
			Math.floor(
				Number.parseFloat(quote.outputAmount) * tolerance * 10 ** quote.output.decimals,
			),
		)

		const calldata = encodeFunctionData({
			abi: routerAbi,
			functionName: "exactInputSingle",
			args: [
				{
					tokenIn: raw.tokenIn as `0x${string}`,
					tokenOut: raw.tokenOut as `0x${string}`,
					fee: raw.fee,
					recipient: sender as `0x${string}`,
					amountIn: BigInt(raw.sellAmount),
					amountOutMinimum: minOut,
					sqrtPriceLimitX96: BigInt(0),
				},
			],
		})

		const isNativeInput = isNative(quote.input)

		const hash = await signer.sendTransaction({
			to: router as `0x${string}`,
			data: calldata,
			value: isNativeInput ? BigInt(raw.sellAmount) : BigInt(0),
		})

		return {
			status: "success" as const,
			hash,
			explorer: `${explorer}/${hash}`,
		}
	},
}
