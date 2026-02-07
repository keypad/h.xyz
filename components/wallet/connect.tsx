"use client"

import { useWalletContext } from "./context"

export default function ConnectButton() {
	const { connected, connecting, address, connect, disconnect, chain } = useWalletContext()

	if (connecting) {
		return (
			<button
				type="button"
				disabled
				className="w-full rounded-xl bg-white/[0.06] py-4 text-sm font-medium text-white/40"
			>
				connecting...
			</button>
		)
	}

	if (connected && address) {
		return (
			<button
				type="button"
				onClick={disconnect}
				className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-4 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.09]"
			>
				<span className="h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
				<span className="font-mono text-xs">
					{address.slice(0, 6)}...{address.slice(-4)}
				</span>
				<span className="hidden text-white/30 group-hover:inline">disconnect</span>
			</button>
		)
	}

	return (
		<button
			type="button"
			onClick={() => connect(chain)}
			className="w-full rounded-xl bg-[#EC4612] py-4 text-sm font-medium text-white transition-all hover:brightness-110"
		>
			connect wallet
		</button>
	)
}
