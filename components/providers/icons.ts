import type { SwapToken } from "./types"

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains"
const ETH = `${TW}/ethereum/assets`

const CHAIN_LOGO: Record<string, string> = {
	ETH: `${TW}/ethereum/info/logo.png`,
	BTC: `${TW}/bitcoin/info/logo.png`,
	SOL: `${TW}/solana/info/logo.png`,
	BNB: `${TW}/binance/info/logo.png`,
	MATIC: `${TW}/polygon/info/logo.png`,
	POL: `${TW}/polygon/info/logo.png`,
	AVAX: `${TW}/avalanchec/info/logo.png`,
	FTM: `${TW}/fantom/info/logo.png`,
	XMR: "https://assets.coingecko.com/coins/images/69/small/monero_logo.png",
	xDAI: `${TW}/xdai/info/logo.png`,
	WXDAI: `${TW}/xdai/info/logo.png`,
	WMATIC: `${TW}/polygon/info/logo.png`,
}

const SYMBOL_ICON: Record<string, string> = {
	USDC: `${ETH}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`,
	USDT: `${ETH}/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png`,
	DAI: `${ETH}/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png`,
	WETH: `${ETH}/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png`,
	WBTC: `${ETH}/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png`,
	UNI: `${ETH}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png`,
	AAVE: `${ETH}/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png`,
	LINK: `${ETH}/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png`,
	COW: `${ETH}/0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB/logo.png`,
}

const EVM_CHAINS: Record<number, string> = {
	1: "ethereum",
	10: "optimism",
	56: "smartchain",
	100: "xdai",
	137: "polygon",
	8453: "base",
	42161: "arbitrum",
	43114: "avalanchec",
}

export function tokenIcon(token: SwapToken): string | undefined {
	if (token.logo) return token.logo
	if (CHAIN_LOGO[token.symbol]) return CHAIN_LOGO[token.symbol]
	if (SYMBOL_ICON[token.symbol]) return SYMBOL_ICON[token.symbol]

	const chainId = Number(token.chainId || 0)
	const chain = EVM_CHAINS[chainId]
	if (
		chain &&
		token.address &&
		!token.address.startsWith("0x000000000000") &&
		!token.address.toLowerCase().startsWith("0xeeee")
	) {
		return `${TW}/${chain}/assets/${token.address}/logo.png`
	}

	return undefined
}
