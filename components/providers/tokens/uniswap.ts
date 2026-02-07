import type { SwapToken } from "../types"

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets"

const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

export const WETH_BY_CHAIN: Record<number, string> = {
	1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
	137: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
	42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
	10: "0x4200000000000000000000000000000000000006",
	8453: "0x4200000000000000000000000000000000000006",
}

export const QUOTER_BY_CHAIN: Record<number, string> = {
	1: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
	137: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
	42161: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
	10: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
	8453: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
}

export const ROUTER_BY_CHAIN: Record<number, string> = {
	1: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
	137: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
	42161: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
	10: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
	8453: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
}

export const RPC_BY_CHAIN: Record<number, string | undefined> = {
	1: undefined,
	137: "https://polygon-rpc.com",
	42161: "https://arb1.arbitrum.io/rpc",
	10: "https://mainnet.optimism.io",
	8453: "https://mainnet.base.org",
}

export const EXPLORER_BY_CHAIN: Record<number, string> = {
	1: "https://etherscan.io/tx",
	137: "https://polygonscan.com/tx",
	42161: "https://arbiscan.io/tx",
	10: "https://optimistic.etherscan.io/tx",
	8453: "https://basescan.org/tx",
}

const ETH_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "ETH", decimals: 18, name: "Ether", chainId: 1, logo: `${TW}/${WETH_BY_CHAIN[1]}/logo.png` },
	{ address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 1, logo: `${TW}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png` },
	{ address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", symbol: "USDT", decimals: 6, name: "Tether", chainId: 1, logo: `${TW}/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png` },
	{ address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", symbol: "DAI", decimals: 18, name: "Dai", chainId: 1 },
	{ address: WETH_BY_CHAIN[1], symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 1 },
	{ address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", symbol: "UNI", decimals: 18, name: "Uniswap", chainId: 1 },
]

const POLYGON_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "MATIC", decimals: 18, name: "Polygon", chainId: 137 },
	{ address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 137 },
	{ address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", symbol: "USDT", decimals: 6, name: "Tether", chainId: 137 },
	{ address: WETH_BY_CHAIN[137], symbol: "WMATIC", decimals: 18, name: "Wrapped Matic", chainId: 137 },
]

const ARB_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "ETH", decimals: 18, name: "Ether", chainId: 42161 },
	{ address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 42161 },
	{ address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", symbol: "USDT", decimals: 6, name: "Tether", chainId: 42161 },
	{ address: WETH_BY_CHAIN[42161], symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 42161 },
]

const OP_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "ETH", decimals: 18, name: "Ether", chainId: 10 },
	{ address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 10 },
	{ address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58", symbol: "USDT", decimals: 6, name: "Tether", chainId: 10 },
	{ address: WETH_BY_CHAIN[10], symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 10 },
]

const BASE_TOKENS: SwapToken[] = [
	{ address: NATIVE, symbol: "ETH", decimals: 18, name: "Ether", chainId: 8453 },
	{ address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", symbol: "USDC", decimals: 6, name: "USD Coin", chainId: 8453 },
	{ address: WETH_BY_CHAIN[8453], symbol: "WETH", decimals: 18, name: "Wrapped Ether", chainId: 8453 },
]

export const UNI_TOKENS: SwapToken[] = [
	...ETH_TOKENS,
	...POLYGON_TOKENS,
	...ARB_TOKENS,
	...OP_TOKENS,
	...BASE_TOKENS,
]
