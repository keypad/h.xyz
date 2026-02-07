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
	const [copied, setCopied] = useState(false)
	const display = inverted ? 1 / rate : rate
	const from = inverted ? output.symbol : input.symbol
	const to = inverted ? input.symbol : output.symbol
	const text = `1 ${from} = ${fmt(display)} ${to}`

	const click = (e: React.MouseEvent) => {
		if (e.shiftKey || e.metaKey) {
			navigator.clipboard.writeText(text)
			setCopied(true)
			setTimeout(() => setCopied(false), 1200)
		} else {
			setInverted((v) => !v)
		}
	}

	return (
		<button
			type="button"
			onClick={click}
			className="font-mono text-[11px] text-white/30 transition-colors hover:text-white/50"
		>
			{copied ? "copied" : text}
		</button>
	)
}
