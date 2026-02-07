"use client"

import { useEffect, useRef, useState } from "react"
import type { SwapToken } from "../providers/types"

export default function Selector({
	token,
	tokens,
	onSelect,
	exclude,
}: {
	token: SwapToken
	tokens: SwapToken[]
	onSelect: (t: SwapToken) => void
	exclude?: string
}) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener("mousedown", handler)
		return () => document.removeEventListener("mousedown", handler)
	}, [])

	const filtered = tokens.filter((t) => t.address !== exclude)

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex items-center gap-2 rounded-full bg-white/[0.06] py-1.5 pr-2.5 pl-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.09]"
			>
				<span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold">
					{token.symbol[0]}
				</span>
				{token.symbol}
				<svg
					aria-hidden="true"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className={`text-white/30 transition-transform ${open ? "rotate-180" : ""}`}
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>
			{open && (
				<div className="absolute right-0 z-10 mt-2 max-h-64 w-44 overflow-y-auto rounded-xl border border-white/[0.06] bg-[#1e1c1a] p-1.5 shadow-2xl">
					{filtered.map((t) => (
						<button
							key={`${t.symbol}-${t.chainId ?? ""}`}
							type="button"
							onClick={() => {
								onSelect(t)
								setOpen(false)
							}}
							className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
								t.address === token.address
									? "bg-white/[0.06] text-white"
									: "text-white/50 hover:bg-white/[0.03] hover:text-white"
							}`}
						>
							<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold">
								{t.symbol[0]}
							</span>
							<span className="truncate">{t.symbol}</span>
							{t.name && (
								<span className="ml-auto truncate text-[10px] text-white/20">{t.name}</span>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
