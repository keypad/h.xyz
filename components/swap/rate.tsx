"use client"

import { useState } from "react"
import type { SwapToken } from "../providers/types"
import { fmt } from "./modules"

export default function Rate({
	rate,
	input,
	output,
}: {
	rate: number
	input: SwapToken
	output: SwapToken
}) {
	const [inverted, setInverted] = useState(false)
	const display = inverted ? 1 / rate : rate
	const from = inverted ? output.symbol : input.symbol
	const to = inverted ? input.symbol : output.symbol

	return (
		<button
			type="button"
			onClick={() => setInverted((v) => !v)}
			className="font-mono text-[11px] text-white/30 transition-colors hover:text-white/50"
		>
			1 {from} = {fmt(display)} {to}
		</button>
	)
}
