"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { tokenIcon } from "../providers/icons"
import type { SwapToken } from "../providers/types"

function uid(t: SwapToken) {
	return `${t.address}-${t.chainId ?? ""}`
}

function Avatar({ token, size = 32 }: { token: SwapToken; size?: number }) {
	const [err, setErr] = useState(false)
	const colors: Record<string, string> = {
		E: "#627EEA",
		U: "#2775CA",
		B: "#F7931A",
		S: "#00FFA3",
		D: "#F5AC37",
		W: "#627EEA",
		L: "#2A5ADA",
		A: "#B6509E",
		M: "#1AAB9B",
		C: "#012D72",
		P: "#E04338",
		R: "#6B8CEF",
	}
	const bg = colors[token.symbol[0]] ?? "#444"

	const logo = token.logo || tokenIcon(token)

	if (logo && !err) {
		return (
			<img
				src={logo}
				alt=""
				width={size}
				height={size}
				className="shrink-0 rounded-full"
				onError={() => setErr(true)}
			/>
		)
	}

	return (
		<span
			className="flex shrink-0 items-center justify-center rounded-full font-bold"
			style={{
				width: size,
				height: size,
				background: bg,
				fontSize: size * 0.38,
			}}
		>
			{token.symbol.slice(0, 2)}
		</span>
	)
}

function Modal({
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
			if (!q) return true
			return (
				t.symbol.toLowerCase().includes(q) ||
				t.name.toLowerCase().includes(q) ||
				t.address.toLowerCase().includes(q)
			)
		})
	}, [tokens, query, exclude, selected.chainId])

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
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
				onKeyDown={(e) => e.key === "Escape" && onClose()}
				role="button"
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
							onChange={(e) => setQuery(e.target.value)}
							placeholder="search by token or address"
							className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/20 md:text-sm"
						/>
						{query && (
							<button
								type="button"
								onClick={() => setQuery("")}
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

				{!query && (
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
				)}

				<div className="mt-3 min-h-0 flex-1 overflow-y-auto border-t border-white/[0.04] px-2 py-2 md:max-h-72">
					{filtered.length === 0 && (
						<div className="py-8 text-center text-sm text-white/20">no tokens found</div>
					)}
					{filtered.map((t) => {
						const active = t.address === selected.address && t.chainId === selected.chainId
						return (
							<button
								key={uid(t)}
								type="button"
								onClick={() => pick(t)}
								className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors md:py-2.5 ${
									active
										? "bg-white/[0.06] text-white"
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
			</div>
		</div>
	)
}

function chainLabel(id: number | string): string {
	const labels: Record<string, string> = {
		"1": "eth",
		"10": "opt",
		"56": "bsc",
		"137": "pol",
		"8453": "base",
		"42161": "arb",
		"43114": "avax",
		"7565164": "sol",
	}
	return labels[id.toString()] ?? ""
}

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

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="flex items-center gap-2 rounded-full bg-white/[0.06] py-2 pr-3 pl-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.09] md:py-1.5 md:pr-2.5"
			>
				<Avatar token={token} size={20} />
				{token.symbol}
				<svg
					aria-hidden="true"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="text-white/30"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>
			{open && (
				<Modal
					tokens={tokens}
					selected={token}
					exclude={exclude}
					onSelect={onSelect}
					onClose={() => setOpen(false)}
				/>
			)}
		</>
	)
}
