"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useRef, useState } from "react"
import { useConnect } from "wagmi"
import { useWalletContext } from "./context"

export default function ConnectButton() {
	const { connecting, chain } = useWalletContext()
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const { connect: evmConnect, connectors } = useConnect()
	const sol = useWallet()

	useEffect(() => {
		if (!open) return
		function close(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener("mousedown", close)
		return () => document.removeEventListener("mousedown", close)
	}, [open])

	useEffect(() => {
		if (sol.wallet && !sol.connected && !sol.connecting) {
			sol.connect().catch(() => {})
		}
	}, [sol])

	if (connecting) {
		return (
			<button
				type="button"
				disabled
				className="mt-4 w-full rounded-xl bg-white/[0.06] py-3.5 text-sm font-medium text-white/40 md:py-4"
			>
				connecting...
			</button>
		)
	}

	const items =
		chain === "solana"
			? sol.wallets.map((w) => ({
					id: w.adapter.name,
					name: w.adapter.name,
					icon: w.adapter.icon,
					go: () => sol.select(w.adapter.name),
				}))
			: connectors.map((c) => ({
					id: c.id,
					name: c.name,
					icon: c.icon,
					go: () => evmConnect({ connector: c }),
				}))

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="mt-4 w-full rounded-xl bg-[#EC4612] py-3.5 text-sm font-medium text-white transition-all hover:brightness-110 md:py-4"
			>
				connect wallet
			</button>
			{open && (
				<div className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl border border-white/[0.06] bg-[#2a2826] p-1.5">
					{items.length === 0 && (
						<p className="px-3 py-2 text-xs text-white/30">no wallets detected</p>
					)}
					{items.map((w) => (
						<button
							key={w.id}
							type="button"
							onClick={() => {
								w.go()
								setOpen(false)
							}}
							className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
						>
							{w.icon && (
								<img src={w.icon.trim()} alt="" width={20} height={20} className="rounded" />
							)}
							{w.name}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
