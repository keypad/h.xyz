"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useConnect } from "wagmi"
import { useWalletContext } from "./context"

type WalletItem = {
	id: string
	name: string
	icon?: string
	go: () => void
}

function useEvmWallets(): WalletItem[] {
	const { connect, connectors } = useConnect()
	return useMemo(() => {
		const seen = new Map<string, WalletItem>()
		for (const c of connectors) {
			const key = c.name.toLowerCase()
			const existing = seen.get(key)
			if (existing && !existing.icon && c.icon) {
				seen.set(key, { id: c.id, name: c.name, icon: c.icon, go: () => connect({ connector: c }) })
			} else if (!existing) {
				seen.set(key, { id: c.id, name: c.name, icon: c.icon, go: () => connect({ connector: c }) })
			}
		}
		return Array.from(seen.values())
	}, [connectors, connect])
}

function useSolWallets(): WalletItem[] {
	const sol = useWallet()
	return useMemo(
		() =>
			sol.wallets.map((w) => ({
				id: w.adapter.name,
				name: w.adapter.name,
				icon: w.adapter.icon,
				go: () => sol.select(w.adapter.name),
			})),
		[sol],
	)
}

export default function ConnectButton() {
	const { connecting, chain } = useWalletContext()
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const sol = useWallet()
	const evmItems = useEvmWallets()
	const solItems = useSolWallets()
	const items = chain === "solana" ? solItems : evmItems

	useEffect(() => {
		if (!open) return
		function close(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		function keys(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false)
		}
		document.addEventListener("mousedown", close)
		document.addEventListener("keydown", keys)
		return () => {
			document.removeEventListener("mousedown", close)
			document.removeEventListener("keydown", keys)
		}
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
				<div
					className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl border border-white/[0.06] bg-[#2a2826] p-1.5"
					style={{ animation: "slideup 150ms ease-out" }}
				>
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
