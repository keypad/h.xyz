import type { SwapToken } from "./types"

const TW = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains"

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
}

const EVM_CHAINS: Record<number, string> = {
	1: "ethereum",
	10: "optimism",
	56: "smartchain",
	137: "polygon",
	8453: "base",
	42161: "arbitrum",
	43114: "avalanchec",
}

export function tokenIcon(token: SwapToken): string | undefined {
	if (token.logo) return token.logo

	if (CHAIN_LOGO[token.symbol]) return CHAIN_LOGO[token.symbol]

	const chainId = Number(token.chainId || 0)
	const chain = EVM_CHAINS[chainId]
	if (chain && token.address && !token.address.startsWith("0x000000000000")) {
		return `${TW}/${chain}/assets/${token.address}/logo.png`
	}

	return undefined
}
