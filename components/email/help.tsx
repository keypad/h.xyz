"use client"

import { useEffect, useState } from "react"

const shortcuts = [
	["j / k", "navigate"],
	["Enter", "open"],
	["Escape", "back"],
	["/", "search"],
	["c", "compose"],
	["r", "reply"],
	["f", "forward"],
	["s", "star"],
	["d", "trash"],
	["?", "this help"],
]

export default function Help() {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement).tagName
			if (tag === "INPUT" || tag === "TEXTAREA") return
			if (e.key === "?") setOpen((v) => !v)
			if (e.key === "Escape" && open) setOpen(false)
		}
		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	}, [open])

	if (!open) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<button
				type="button"
				className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-[overlayshow_150ms_ease-out]"
				onClick={() => setOpen(false)}
			/>
			<div className="relative w-full max-w-xs rounded-2xl border border-white/[0.06] bg-[#1e1c1a] p-5 shadow-2xl animate-[slideup_250ms_ease-out]">
				<span className="text-[13px] font-medium text-white">shortcuts</span>
				<div className="mt-4 flex flex-col gap-2.5">
					{shortcuts.map(([key, label]) => (
						<div key={key} className="flex items-center justify-between">
							<span className="text-[12px] text-white/30">{label}</span>
							<kbd className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-white/50">
								{key}
							</kbd>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
