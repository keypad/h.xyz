"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { SwapToken } from "../providers/types"
import Avatar, { type Category, categoryFor, uid } from "./avatar"
import { Search, TokenList } from "./picker"

export default function Modal({
	tokens,
	selected,
	exclude,
	onSelect,
	onClose,
}: {
	tokens: SwapToken[]
	selected: SwapToken
	exclude?: string
	onSelect: (t: SwapToken) => void
	onClose: () => void
}) {
	const [query, setQuery] = useState("")
	const [category, setCategory] = useState<Category>("all")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = ""
		}
	}, [])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", handler)
		return () => document.removeEventListener("keydown", handler)
	}, [onClose])

	const filtered = useMemo(() => {
		const q = query.toLowerCase().trim()
		return tokens.filter((t) => {
			if (t.address === exclude && t.chainId === selected.chainId) return false
			if (q) {
				return (
					t.symbol.toLowerCase().includes(q) ||
					t.name.toLowerCase().includes(q) ||
					t.address.toLowerCase().includes(q)
				)
			}
			if (category === "all") return true
			return categoryFor(t.symbol).includes(category)
		})
	}, [tokens, query, category, exclude, selected.chainId])

	const popular = useMemo(() => {
		const seen = new Set<string>()
		return tokens
			.filter((t) => {
				if (seen.has(t.symbol)) return false
				seen.add(t.symbol)
				return true
			})
			.slice(0, 8)
	}, [tokens])

	const pick = (t: SwapToken) => {
		onSelect(t)
		onClose()
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-end justify-center md:items-start md:pt-[10vh]"
			style={{ animation: "fadein 200ms ease-out" }}
		>
			<button
				type="button"
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
				tabIndex={-1}
			/>
			<div
				className="relative flex max-h-[100dvh] w-full flex-col rounded-t-2xl border border-white/[0.06] bg-[#1e1c1a] shadow-2xl md:max-h-[80vh] md:max-w-md md:rounded-2xl"
				style={{ animation: "slideup 200ms ease-out" }}
			>
				<div className="flex items-start justify-between p-4 pb-0 md:p-5 md:pb-0">
					<div>
						<h3 className="text-base font-semibold text-white">select a token</h3>
						<p className="mt-1 text-[11px] text-white/30">search by name or address</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="flex h-11 w-11 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60 md:h-8 md:w-8"
					>
						<svg
							aria-hidden="true"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				</div>

				<Search query={query} onChange={setQuery} inputRef={inputRef} />

				{!query && (
					<>
						<div className="flex gap-1.5 overflow-x-auto px-4 pt-3 md:px-5">
							{(["all", "popular", "defi", "stablecoins"] as Category[]).map((cat) => (
								<button
									key={cat}
									type="button"
									onClick={() => setCategory(cat)}
									className={`shrink-0 rounded-full border border-white/[0.06] px-3 py-1.5 text-xs font-medium transition-colors ${
										category === cat
											? "bg-white/10 text-white"
											: "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
									}`}
								>
									{cat}
								</button>
							))}
						</div>

						<div className="flex flex-wrap gap-1.5 px-4 pt-3 md:px-5">
							{popular.map((t) => (
								<button
									key={uid(t)}
									type="button"
									onClick={() => pick(t)}
									className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white md:px-2.5 md:py-1.5"
								>
									<Avatar token={t} size={18} />
									{t.symbol}
								</button>
							))}
						</div>
					</>
				)}

				<TokenList tokens={filtered} selected={selected} onPick={pick} />
			</div>
		</div>
	)
}
