import { cow } from "../providers/cow"
import { debridge } from "../providers/debridge"
import { houdini } from "../providers/houdini"
import { jupiter } from "../providers/jupiter"
import type { ProviderModule } from "../providers/types"
import { uniswap } from "../providers/uniswap"

export const modules: Record<string, ProviderModule> = {
	jupiter,
	cow,
	debridge,
	houdini,
	uniswap,
}

export function fmt(n: number) {
	if (n === 0) return "0"
	const abs = Math.abs(n)
	if (abs >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 })
	if (abs >= 1) return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })
	if (abs >= 0.001) return n.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 6 })
	return n.toLocaleString("en-US", { minimumSignificantDigits: 2, maximumSignificantDigits: 4 })
}
