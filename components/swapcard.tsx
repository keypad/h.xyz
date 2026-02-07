"use client"

import { useEffect, useRef, useState } from "react"
import { fmt, type Token, TokenLogo, tokens } from "@/components/tokens"

type Prices = Record<string, { usd: number; change: number }>

function Selector({
	token,
	onSelect,
	exclude,
}: {
	token: Token
	onSelect: (t: Token) => void
	exclude: string
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

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex items-center gap-2 rounded-full bg-white/[0.06] py-1.5 pr-2.5 pl-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.09]"
			>
				<TokenLogo token={token} />
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
				<div className="absolute right-0 z-10 mt-2 w-44 rounded-xl border border-white/[0.06] bg-[#1e1c1a] p-1.5 shadow-2xl">
					{tokens
						.filter((t) => t.id !== exclude)
						.map((t) => (
							<button
								key={t.id}
								type="button"
								onClick={() => {
									onSelect(t)
									setOpen(false)
								}}
								className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
									t.id === token.id
										? "bg-white/[0.06] text-white"
										: "text-white/50 hover:bg-white/[0.03] hover:text-white"
								}`}
							>
								<TokenLogo token={t} />
								{t.symbol}
							</button>
						))}
				</div>
			)}
		</div>
	)
}

export default function Swapcard() {
	const [prices, setPrices] = useState<Prices>({})
	const [pay, setPay] = useState(tokens[0])
	const [receive, setReceive] = useState(tokens[1])
	const [amount, setAmount] = useState("1")

	useEffect(() => {
		const load = () => {
			const ids = tokens.map((t) => t.id).join(",")
			fetch(
				`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
			)
				.then((r) => r.json())
				.then((d) => {
					const p: Prices = {}
					for (const t of tokens) {
						if (d[t.id]) p[t.id] = { usd: d[t.id].usd, change: d[t.id].usd_24h_change }
					}
					setPrices(p)
				})
				.catch(() =>
					setPrices({
						ethereum: { usd: 2847.63, change: -1.24 },
						bitcoin: { usd: 97421.0, change: 2.15 },
						solana: { usd: 198.42, change: 3.81 },
						monero: { usd: 221.5, change: 0.67 },
						"usd-coin": { usd: 1.0, change: 0.01 },
					}),
				)
		}
		load()
		const interval = setInterval(load, 30000)
		return () => clearInterval(interval)
	}, [])

	const parsed = Number.parseFloat(amount) || 0
	const payUsd = prices[pay.id] ? parsed * prices[pay.id].usd : 0
	const output =
		prices[pay.id] && prices[receive.id]
			? (parsed * prices[pay.id].usd) / prices[receive.id].usd
			: 0
	const receiveUsd = prices[receive.id] ? output * prices[receive.id].usd : 0
	const rate =
		prices[pay.id] && prices[receive.id] ? prices[pay.id].usd / prices[receive.id].usd : 0
	const change = prices[pay.id]?.change ?? 0
	const positive = change >= 0
	const savings = payUsd > 0 ? fmt(payUsd * 0.0015) : "0.00"
	const loaded = Object.keys(prices).length > 0

	const flip = () => {
		setPay(receive)
		setReceive(pay)
		setAmount(output > 0 ? output.toFixed(6).replace(/\.?0+$/, "") : "1")
	}

	return (
		<div className="rounded-2xl border border-white/[0.06] bg-[#1e1c1a] p-5">
			<div className="mb-3 flex items-center justify-between px-1">
				<div className="flex items-center gap-2 text-[11px] text-white/20">
					<span className="relative flex h-1.5 w-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BCEC79] opacity-75" />
						<span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
					</span>
					live
				</div>
				{loaded && (
					<span
						className={`font-mono text-[11px] ${positive ? "text-[#BCEC79]" : "text-[#EC4612]"}`}
					>
						{pay.symbol} {positive ? "+" : ""}
						{change.toFixed(2)}% 24h
					</span>
				)}
			</div>

			<div className="rounded-xl bg-white/[0.03] p-4">
				<span className="text-[11px] text-white/25">you pay</span>
				<div className="mt-2 flex items-center justify-between gap-3">
					<input
						type="text"
						inputMode="decimal"
						value={amount}
						onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
						className="w-0 min-w-0 flex-1 bg-transparent text-3xl font-medium text-white outline-none placeholder:text-white/20"
						placeholder="0"
					/>
					<Selector token={pay} onSelect={setPay} exclude={receive.id} />
				</div>
				<span className="mt-1.5 block text-[11px] text-white/15">
					~${loaded ? fmt(payUsd) : "—"}
				</span>
			</div>

			<div className="relative my-1 flex justify-center">
				<button
					type="button"
					onClick={flip}
					className="absolute -top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1e1c1a] text-white/30 transition-all hover:rotate-180 hover:text-white/50"
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
						<path d="M12 5v14m0 0l-4-4m4 4l4-4" />
					</svg>
				</button>
			</div>

			<div className="rounded-xl bg-white/[0.03] p-4">
				<span className="text-[11px] text-white/25">you receive</span>
				<div className="mt-2 flex items-center justify-between gap-3">
					<span className="text-3xl font-medium text-white">
						{loaded && output > 0 ? fmt(output) : "—"}
					</span>
					<Selector token={receive} onSelect={setReceive} exclude={pay.id} />
				</div>
				<span className="mt-1.5 block text-[11px] text-white/15">
					~${loaded ? fmt(receiveUsd) : "—"}
				</span>
			</div>

			<div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/[0.04] px-4 py-3">
				<div className="flex items-center justify-between text-[12px]">
					<span className="text-white/20">rate</span>
					<span className="font-mono text-white/35">
						1 {pay.symbol} = {rate > 0 ? fmt(rate) : "—"} {receive.symbol}
					</span>
				</div>
				<div className="flex items-center justify-between text-[12px]">
					<span className="text-white/20">route</span>
					<span className="text-white/35">h.xyz batch auction</span>
				</div>
				<div className="flex items-center justify-between text-[12px]">
					<span className="text-white/20">mev savings</span>
					<span className="text-[#BCEC79]">~${savings}</span>
				</div>
				<div className="flex items-center justify-between text-[12px]">
					<span className="text-white/20">network</span>
					<div className="flex items-center gap-1.5 text-white/35">
						<span className="h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
						ethereum
					</div>
				</div>
			</div>

			<button
				type="button"
				className="mt-4 w-full rounded-xl bg-[#EC4612] py-4 text-sm font-medium text-white transition-all hover:brightness-110"
			>
				swap
			</button>
		</div>
	)
}
