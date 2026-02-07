"use client"

import { useState } from "react"
import { tokenIcon } from "../providers/icons"
import type { SwapToken } from "../providers/types"

export function uid(t: SwapToken) {
	return `${t.address}-${t.chainId ?? ""}`
}

export function chainLabel(id: number | string): string {
	const labels: Record<string, string> = {
		"1": "eth",
		"10": "opt",
		"56": "bsc",
		"137": "pol",
		"8453": "base",
		"42161": "arb",
		"43114": "avax",
		"7565164": "sol",
	}
	return labels[id.toString()] ?? ""
}

export type Category = "all" | "popular" | "defi" | "stablecoins"

export function categoryFor(symbol: string): Category[] {
	const s = symbol.toLowerCase()
	const cats: Category[] = ["all"]
	if (["eth", "btc", "sol", "wbtc", "weth", "matic"].includes(s)) cats.push("popular")
	if (["usdc", "usdt", "dai", "busd"].includes(s)) cats.push("stablecoins")
	if (
		["uni", "aave", "crv", "comp", "mkr", "ldo", "link", "snx", "grt", "cow", "jup", "ray"].includes(s)
	)
		cats.push("defi")
	return cats
}

const colors: Record<string, string> = {
	E: "#627EEA",
	U: "#2775CA",
	B: "#F7931A",
	S: "#00FFA3",
	D: "#F5AC37",
	W: "#627EEA",
	L: "#2A5ADA",
	A: "#B6509E",
	M: "#1AAB9B",
	C: "#012D72",
	P: "#E04338",
	R: "#6B8CEF",
}

export default function Avatar({ token, size = 32 }: { token: SwapToken; size?: number }) {
	const [err, setErr] = useState(false)
	const bg = colors[token.symbol[0]] ?? "#444"
	const logo = token.logo || tokenIcon(token)

	if (logo && !err) {
		return (
			<img
				src={logo}
				alt=""
				width={size}
				height={size}
				className="shrink-0 rounded-full"
				onError={() => setErr(true)}
			/>
		)
	}

	return (
		<span
			className="flex shrink-0 items-center justify-center rounded-full font-bold"
			style={{ width: size, height: size, background: bg, fontSize: size * 0.38 }}
		>
			{token.symbol.slice(0, 2)}
		</span>
	)
}
