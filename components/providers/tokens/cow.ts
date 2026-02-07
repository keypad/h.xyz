import type { SwapToken } from "../types"

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets"

const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

export const WETH_BY_CHAIN: Record<number, string> = {
	1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
	100: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
	42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
	8453: "0x4200000000000000000000000000000000000006",
}

const ETH_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "ETH", decimals: 18, name: "Ether", chainId: 1, logo: `${TW}/${WETH_BY_CHAIN[1]}/logo.png` },
	{ address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 1, logo: `${TW}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png` },
	{ address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", symbol: "USDT", decimals: 6, name: "Tether", chainId: 1, logo: `${TW}/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png` },
	{ address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", symbol: "DAI", decimals: 18, name: "Dai", chainId: 1 },
	{ address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", symbol: "WBTC", decimals: 8, name: "Wrapped BTC", chainId: 1 },
	{ address: WETH_BY_CHAIN[1], symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 1 },
	{ address: "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB", symbol: "COW", decimals: 18, name: "CoW Protocol", chainId: 1 },
	{ address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", symbol: "LINK", decimals: 18, name: "Chainlink", chainId: 1 },
	{ address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", symbol: "UNI", decimals: 18, name: "Uniswap", chainId: 1 },
	{ address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", symbol: "AAVE", decimals: 18, name: "Aave", chainId: 1 },
]

const GNOSIS_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "xDAI", decimals: 18, name: "xDai", chainId: 100 },
	{ address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 100 },
	{ address: WETH_BY_CHAIN[100], symbol: "WXDAI", decimals: 18, name: "Wrapped xDai", chainId: 100 },
	{ address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1", symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 100 },
]

const ARB_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "ETH", decimals: 18, name: "Ether", chainId: 42161 },
	{ address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 42161 },
	{ address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", symbol: "USDT", decimals: 6, name: "Tether", chainId: 42161 },
	{ address: WETH_BY_CHAIN[42161], symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 42161 },
]

const BASE_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "ETH", decimals: 18, name: "Ether", chainId: 8453 },
	{ address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 8453 },
	{ address: WETH_BY_CHAIN[8453], symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 8453 },
]

export const COW_TOKENS: SwapToken[] = [
	...ETH_TOKENS,
	...GNOSIS_TOKENS,
	...ARB_TOKENS,
	...BASE_TOKENS,
]
