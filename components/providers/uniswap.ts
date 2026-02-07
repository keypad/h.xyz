import type { ProviderModule, SwapToken } from "./types"
import { toSmallest } from "./types"

const ROUTER = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD"
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const QUOTER = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets"

const TOKENS: SwapToken[] = [
	{
		address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
		symbol: "ETH",
		decimals: 18,
		name: "Ether",
		chainId: 1,
		logo: `${TW}/${WETH}/logo.png`,
	},
	{
		address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		symbol: "USDC",
		decimals: 6,
		name: "USD Coin",
		chainId: 1,
		logo: `${TW}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`,
	},
	{
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		symbol: "USDT",
		decimals: 6,
		name: "Tether",
		chainId: 1,
		logo: `${TW}/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png`,
	},
	{
		address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
		symbol: "DAI",
		decimals: 18,
		name: "Dai",
		chainId: 1,
		logo: `${TW}/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png`,
	},
	{
		address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
		symbol: "WBTC",
		decimals: 8,
		name: "Wrapped BTC",
		chainId: 1,
		logo: `${TW}/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png`,
	},
	{
		address: WETH,
		symbol: "WETH",
		decimals: 18,
		name: "Wrapped Ether",
		chainId: 1,
		logo: `${TW}/${WETH}/logo.png`,
	},
	{
		address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
		symbol: "UNI",
		decimals: 18,
		name: "Uniswap",
		chainId: 1,
		logo: `${TW}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png`,
	},
	{
		address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
		symbol: "LINK",
		decimals: 18,
		name: "Chainlink",
		chainId: 1,
		logo: `${TW}/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png`,
	},
	{
		address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
		symbol: "AAVE",
		decimals: 18,
		name: "Aave",
		chainId: 1,
		logo: `${TW}/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png`,
	},
	{
		address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
		symbol: "MKR",
		decimals: 18,
		name: "Maker",
		chainId: 1,
		logo: `${TW}/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png`,
	},
	{
		address: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
		symbol: "LDO",
		decimals: 18,
		name: "Lido DAO",
		chainId: 1,
		logo: `${TW}/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32/logo.png`,
	},
	{
		address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
		symbol: "PEPE",
		decimals: 18,
		name: "Pepe",
		chainId: 1,
		logo: `${TW}/0x6982508145454Ce325dDbE47a25d4ec3d2311933/logo.png`,
	},
	{
		address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
		symbol: "SHIB",
		decimals: 18,
		name: "Shiba Inu",
		chainId: 1,
		logo: `${TW}/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE/logo.png`,
	},
	{
		address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
		symbol: "CRV",
		decimals: 18,
		name: "Curve DAO",
		chainId: 1,
		logo: `${TW}/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png`,
	},
	{
		address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
		symbol: "COMP",
		decimals: 18,
		name: "Compound",
		chainId: 1,
		logo: `${TW}/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png`,
	},
	{
		address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
		symbol: "APE",
		decimals: 18,
		name: "ApeCoin",
		chainId: 1,
		logo: `${TW}/0x4d224452801ACEd8B2F0aebE155379bb5D594381/logo.png`,
	},
]

function tokenAddress(token: SwapToken): string {
	if (token.symbol === "ETH") return WETH
	return token.address
}

export const uniswap: ProviderModule = {
	tokens: () => TOKENS,

	quote: async ({ input, output, amount }) => {
		const sellAmount = toSmallest(amount, input.decimals)
		if (sellAmount === "0") return null

		const tokenIn = tokenAddress(input)
		const tokenOut = tokenAddress(output)

		try {
			const { encodeFunctionData, createPublicClient, http, parseAbi, decodeFunctionResult } =
				await import("viem")
			const { mainnet } = await import("viem/chains")

			const client = createPublicClient({ chain: mainnet, transport: http() })

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
				to: QUOTER as `0x${string}`,
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
				_raw: { tokenIn, tokenOut, sellAmount, fee: 3000 },
			}
		} catch {
			return null
		}
	},

	swap: async ({ quote, sender, signer }) => {
		const raw = quote._raw as Record<string, any> | undefined
		if (!raw || !signer) return { status: "error", message: "missing data" }

		const { encodeFunctionData, parseAbi } = await import("viem")

		const routerAbi = parseAbi([
			"function exactInputSingle((address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)",
		])

		const slippage = 0.995
		const minOut = BigInt(
			Math.floor(Number.parseFloat(quote.outputAmount) * slippage * 10 ** quote.output.decimals),
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

		const isEth = quote.input.symbol === "ETH"

		const hash = await signer.sendTransaction({
			to: ROUTER as `0x${string}`,
			data: calldata,
			value: isEth ? BigInt(raw.sellAmount) : BigInt(0),
		})

		return {
			status: "success" as const,
			hash,
			explorer: `https://etherscan.io/tx/${hash}`,
		}
	},
}
