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
	return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
