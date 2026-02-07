"use client"

import { useWalletContext } from "../wallet/context"

function truncate(addr: string) {
	return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export default function Wallet() {
	const { address, disconnect } = useWalletContext()
	if (!address) return null

	return (
		<div className="flex items-center justify-between">
			<span className="font-mono text-[11px] text-white/30">{truncate(address)}</span>
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
