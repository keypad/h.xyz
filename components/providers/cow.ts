import type { ProviderModule, SwapToken } from "./types"
import { toSmallest } from "./types"

const CHAINS: Record<number, string> = {
	1: "mainnet",
	100: "xdai",
	42161: "arbitrum_one",
	8453: "base",
}

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets"

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

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
		address: "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB",
		symbol: "COW",
		decimals: 18,
		name: "CoW Protocol",
		chainId: 1,
		logo: `${TW}/0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB/logo.png`,
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
		address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
		symbol: "UNI",
		decimals: 18,
		name: "Uniswap",
		chainId: 1,
		logo: `${TW}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png`,
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
		address: "0xD33526068D116cE69F19A9ee46F0bd304F21A51f",
		symbol: "RPL",
		decimals: 18,
		name: "Rocket Pool",
		chainId: 1,
		logo: `${TW}/0xD33526068D116cE69F19A9ee46F0bd304F21A51f/logo.png`,
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
		address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
		symbol: "SNX",
		decimals: 18,
		name: "Synthetix",
		chainId: 1,
		logo: `${TW}/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png`,
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
		address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
		symbol: "GRT",
		decimals: 18,
		name: "The Graph",
		chainId: 1,
		logo: `${TW}/0xc944E90C64B2c07662A292be6244BDf05Cda44a7/logo.png`,
	},
	{
		address: "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72",
		symbol: "ENS",
		decimals: 18,
		name: "Ethereum Name Service",
		chainId: 1,
		logo: `${TW}/0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72/logo.png`,
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
]

const API = "https://api.cow.fi"

export const cow: ProviderModule = {
	tokens: () => TOKENS,

	quote: async ({ input, output, amount, sender }) => {
		const chainId = (input.chainId as number) || 1
		const chain = CHAINS[chainId]
		if (!chain) return null

		const sellAmount = toSmallest(amount, input.decimals)
		if (sellAmount === "0") return null

		const sellToken = input.symbol === "ETH" ? WETH : input.address
		const buyToken = output.symbol === "ETH" ? WETH : output.address

		const from = sender || "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
		const body: Record<string, any> = {
			sellToken,
			buyToken,
			sellAmountBeforeFee: sellAmount,
			kind: "sell",
			from,
			receiver: from,
			validFor: 1800,
		}

		const res = await fetch(`${API}/${chain}/api/v1/quote`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})

		if (!res.ok) return null
		const data = await res.json()

		const outputAmount = (Number(BigInt(data.quote.buyAmount)) / 10 ** output.decimals).toString()
		const inputNum = Number.parseFloat(amount)
		const outputNum = Number.parseFloat(outputAmount)

		return {
			provider: "cow",
			input,
			output,
			inputAmount: amount,
			outputAmount,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: "cow batch auction",
			fee: (Number(BigInt(data.quote.feeAmount)) / 10 ** input.decimals).toFixed(6),
			_raw: data,
		}
	},

	swap: async ({ quote, sender, signer }) => {
		const raw = quote._raw as Record<string, any> | undefined
		if (!raw || !signer) return { status: "error", message: "missing data" }

		const chainId = (quote.input.chainId as number) || 1
		const chain = CHAINS[chainId]
		if (!chain) return { status: "error", message: "unsupported chain" }

		const order = raw.quote
		const signature = await signer.signTypedData({
			domain: {
				name: "Gnosis Protocol",
				version: "v2",
				chainId,
				verifyingContract: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
			},
			types: {
				Order: [
					{ name: "sellToken", type: "address" },
					{ name: "buyToken", type: "address" },
					{ name: "receiver", type: "address" },
					{ name: "sellAmount", type: "uint256" },
					{ name: "buyAmount", type: "uint256" },
					{ name: "validTo", type: "uint32" },
					{ name: "appData", type: "bytes32" },
					{ name: "feeAmount", type: "uint256" },
					{ name: "kind", type: "string" },
					{ name: "partiallyFillable", type: "bool" },
					{ name: "sellTokenBalance", type: "string" },
					{ name: "buyTokenBalance", type: "string" },
				],
			},
			primaryType: "Order",
			message: order,
		})

		const res = await fetch(`${API}/${chain}/api/v1/orders`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...order,
				signature,
				signingScheme: "eip712",
				from: sender,
			}),
		})

		if (!res.ok) return { status: "error", message: "order submission failed" }
		const uid = await res.json()

		return {
			status: "success" as const,
			hash: uid,
			explorer: `https://explorer.cow.fi/orders/${uid}`,
		}
	},
}
