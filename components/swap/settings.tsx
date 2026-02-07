"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const PRESETS = [0.1, 0.5, 1.0]
const DEFAULT = 0.5

export function useSlippage() {
	const [slippage, setSlippage] = useState(DEFAULT)
	return { slippage, setSlippage }
}

export default function Settings({
	slippage,
	onChange,
}: {
	slippage: number
	onChange: (v: number) => void
}) {
	const [open, setOpen] = useState(false)
	const [custom, setCustom] = useState("")
	const ref = useRef<HTMLDivElement>(null)

	const close = useCallback(() => setOpen(false), [])

	useEffect(() => {
		if (!open) return
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) close()
		}
		const keys = (e: KeyboardEvent) => {
			if (e.key === "Escape") close()
		}
		document.addEventListener("mousedown", handler)
		document.addEventListener("keydown", keys)
		return () => {
			document.removeEventListener("mousedown", handler)
			document.removeEventListener("keydown", keys)
		}
	}, [open, close])

	const select = (v: number) => {
		setCustom("")
		onChange(v)
		close()
	}

	const handleCustom = (val: string) => {
		const clean = val.replace(/[^0-9.]/g, "")
		setCustom(clean)
		const n = Number.parseFloat(clean)
		if (n > 0 && n <= 50) onChange(n)
	}

	const active = !PRESETS.includes(slippage)

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:text-white/50 ${
				slippage !== DEFAULT ? "text-[#EC4612]/60" : "text-white/30"
			}`}
			>
				<svg
					aria-hidden="true"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="3" />
					<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
				</svg>
			</button>

			{open && (
				<div
					className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-white/[0.06] bg-[#1e1c1a] p-3 shadow-xl"
					style={{ animation: "slideup 150ms ease-out" }}
				>
					<span className="text-[11px] text-white/25">slippage</span>
					<div className="mt-2 flex gap-1.5">
						{PRESETS.map((v) => (
							<button
								key={v}
								type="button"
								onClick={() => select(v)}
								className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
									slippage === v && !active
										? "bg-white/[0.08] text-white"
										: "text-white/30 hover:text-white/50"
								}`}
							>
								{v}%
							</button>
						))}
					</div>
					<div className="mt-2 flex items-center gap-1.5">
						<input
							type="text"
							inputMode="decimal"
							value={custom}
							onChange={(e) => handleCustom(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && close()}
							placeholder="custom"
							className={`w-full rounded-lg border px-2.5 py-1.5 text-xs text-white outline-none placeholder:text-white/20 ${
								active
									? "border-white/[0.1] bg-white/[0.06]"
									: "border-white/[0.06] bg-white/[0.03]"
							}`}
						/>
						<span className="text-xs text-white/25">%</span>
					</div>
				</div>
			)}
		</div>
	)
}
