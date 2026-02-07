"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { providers } from "../providers/registry"
import type { ChainType } from "../providers/types"
import { WalletContextProvider } from "../wallet/context"
import ChainSelector, { chainsFor } from "./chain"
import SwapForm from "./form"

function chainFor(id: string): ChainType {
	const p = providers.find((p) => p.id === id)
	return p?.chains[0] ?? "evm"
}

export default function Panel() {
	const [active, setActive] = useState("jupiter")
	const [chainId, setChainId] = useState(1)
	const [fading, setFading] = useState(false)
	const chain = chainFor(active)
	const chains = chainsFor(active)
	const tabsRef = useRef<HTMLDivElement>(null)
	const [indicator, setIndicator] = useState({ left: 0, width: 0 })

	useEffect(() => {
		const hash = window.location.hash.slice(1)
		if (hash && providers.some((p) => p.id === hash)) setActive(hash)
	}, [])

	useLayoutEffect(() => {
		const container = tabsRef.current
		if (!container) return
		const btn = container.querySelector<HTMLElement>(`[data-tab="${active}"]`)
		if (!btn) return
		setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth })
	}, [active])

	useEffect(() => {
		window.location.hash = active
	}, [active])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement).tagName
			if (tag === "INPUT" || tag === "TEXTAREA") return
			const idx = Number(e.key) - 1
			if (idx >= 0 && idx < providers.length) switchTab(providers[idx].id)
		}
		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	})

	const switchTab = (id: string) => {
		if (id === active) return
		setFading(true)
		setTimeout(() => {
			setActive(id)
			setChainId(1)
			setFading(false)
		}, 150)
	}

	return (
		<WalletContextProvider chain={chain}>
			<div className="-mx-1 overflow-x-auto px-1 md:mx-0 md:px-0">
				<div ref={tabsRef} className="relative flex min-w-max gap-1 rounded-xl bg-white/[0.03] p-1 md:min-w-0">
					<span
						className="absolute top-1 h-[calc(100%-8px)] rounded-lg bg-white/[0.06] transition-all duration-200"
						style={{ left: indicator.left, width: indicator.width }}
					/>
					{providers.map((p) => {
						const prov = providers.find((x) => x.id === p.id)
						return (
							<button
								key={p.id}
								data-tab={p.id}
								type="button"
								onClick={() => switchTab(p.id)}
								className={`relative z-10 flex-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-colors md:py-2 ${
									active === p.id ? "text-white" : "text-white/30 hover:text-white/50"
								}`}
							>
								{active === p.id && (
									<span
										className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
										style={{ background: prov?.color }}
									/>
								)}
								{p.id}
							</button>
						)
					})}
				</div>
			</div>

			{chains && (
				<div className="mt-2 px-1">
					<ChainSelector chains={chains} active={chainId} onChange={setChainId} />
				</div>
			)}

			<div className="mt-4 transition-opacity duration-150" style={{ opacity: fading ? 0 : 1 }}>
				<SwapForm key={`${active}-${chainId}`} providerId={active} chainId={chainId} />
			</div>
		</WalletContextProvider>
	)
}
