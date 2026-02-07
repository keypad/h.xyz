"use client"

import { useState } from "react"
import { useWalletContext } from "../wallet/context"

function truncate(addr: string) {
	return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export default function Wallet() {
	const { address, disconnect } = useWalletContext()
	const [copied, setCopied] = useState(false)
	if (!address) return null

	const copy = () => {
		navigator.clipboard.writeText(address)
		setCopied(true)
		setTimeout(() => setCopied(false), 1500)
	}

	return (
		<div className="flex items-center justify-between">
			<button
				type="button"
				onClick={copy}
				className="font-mono text-[11px] text-white/30 transition-colors hover:text-white/50"
			>
				{copied ? "copied" : truncate(address)}
			</button>
			<button
				type="button"
				onClick={disconnect}
				className="text-[11px] text-white/20 transition-colors hover:text-white/40"
			>
				disconnect
			</button>
		</div>
	)
}
