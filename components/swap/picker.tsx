"use client"

import { useEffect, useRef } from "react"
import type { SwapToken } from "../providers/types"
import Avatar, { chainLabel, uid } from "./avatar"

export function Search({
	query,
	onChange,
	inputRef,
}: {
	query: string
	onChange: (v: string) => void
	inputRef: React.RefObject<HTMLInputElement | null>
}) {
	return (
		<div className="px-4 pt-4 md:px-5">
			<div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3.5 md:py-3">
				<svg
					aria-hidden="true"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="shrink-0 text-white/20"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="M21 21l-4.3-4.3" />
				</svg>
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => onChange(e.target.value)}
					placeholder="search by token or address"
					className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/20 md:text-sm"
				/>
				{query && (
					<button
						type="button"
						aria-label="clear"
						onClick={() => onChange("")}
						className="text-white/20 hover:text-white/40"
					>
						<svg
							aria-hidden="true"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				)}
			</div>
		</div>
	)
}

export function Skeleton() {
	return (
		<div className="mt-3 border-t border-white/[0.04] px-2 py-2">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="flex items-center gap-3 px-3 py-2.5">
					<div className="h-9 w-9 animate-pulse rounded-full bg-white/[0.06]" />
					<div className="flex-1">
						<div className="h-3.5 w-16 animate-pulse rounded bg-white/[0.06]" />
						<div className="mt-1.5 h-2.5 w-24 animate-pulse rounded bg-white/[0.04]" />
					</div>
				</div>
			))}
		</div>
	)
}

export function TokenList({
	tokens,
	selected,
	onPick,
	focusIndex,
}: {
	tokens: SwapToken[]
	selected: SwapToken
	onPick: (t: SwapToken) => void
	focusIndex?: number
}) {
	const refs = useRef<Map<number, HTMLButtonElement>>(new Map())

	useEffect(() => {
		if (focusIndex == null) return
		const el = refs.current.get(focusIndex)
		el?.scrollIntoView({ block: "nearest", behavior: "smooth" })
	}, [focusIndex])

	return (
		<div className="mt-3 min-h-0 flex-1 overflow-y-auto border-t border-white/[0.04] px-2 py-2 md:max-h-72">
			{tokens.length === 0 && (
				<div className="py-8 text-center text-sm text-white/20">no tokens found</div>
			)}
			{tokens.map((t, i) => {
				const id = uid(t)
				const active = t.address === selected.address && t.chainId === selected.chainId
				const focused = focusIndex === i
				return (
					<button
						key={id}
						ref={(el) => {
							if (el) refs.current.set(i, el)
						}}
						type="button"
						onClick={() => onPick(t)}
						className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors md:py-2.5 ${
							active
								? "bg-white/[0.06] text-white"
								: focused
									? "bg-white/[0.03] text-white"
									: "text-white/60 hover:bg-white/[0.03] hover:text-white"
						}`}
					>
						<Avatar token={t} size={36} />
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2">
								<span className="text-sm font-medium">{t.symbol}</span>
								{t.chainId && (
									<span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-white/20">
										{chainLabel(t.chainId)}
									</span>
								)}
							</div>
							<span className="block truncate text-[11px] text-white/25">{t.name}</span>
						</div>
						{active && (
							<svg
								aria-hidden="true"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="shrink-0 text-[#BCEC79]"
							>
								<path d="M5 13l4 4L19 7" />
							</svg>
						)}
					</button>
				)
			})}
		</div>
	)
}
