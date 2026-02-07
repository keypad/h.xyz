"use client"

import { useEffect, useState } from "react"
import { providers } from "../providers/registry"
import type { ChainType } from "../providers/types"
import { WalletContextProvider } from "../wallet/context"
import ChainSelector, { chainsFor } from "./chain"
import SwapForm from "./form"

function chainFor(id: string): ChainType {
	const p = providers.find((p) => p.id === id)
	return p?.chains[0] ?? "evm"
}

function initial(): string {
	if (typeof window === "undefined") return "jupiter"
	const hash = window.location.hash.slice(1)
	if (providers.some((p) => p.id === hash)) return hash
	return "jupiter"
}

export default function Panel() {
	const [active, setActive] = useState(initial)
	const [chainId, setChainId] = useState(1)
	const [fading, setFading] = useState(false)
	const chain = chainFor(active)
	const chains = chainsFor(active)

	useEffect(() => {
		window.location.hash = active
	}, [active])

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
				<div className="flex min-w-max gap-1 rounded-xl bg-white/[0.03] p-1 md:min-w-0">
					{providers.map((p) => (
						<button
							key={p.id}
							type="button"
							onClick={() => switchTab(p.id)}
							className={`relative flex-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition-colors md:py-2 ${
								active === p.id ? "bg-white/[0.06] text-white" : "text-white/30 hover:text-white/50"
							}`}
						>
							{active === p.id && (
								<span
									className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
									style={{ background: p.color }}
								/>
							)}
							{p.id === "cow" ? "cow" : p.id === "houdini" ? "houdini" : p.id}
						</button>
					))}
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
