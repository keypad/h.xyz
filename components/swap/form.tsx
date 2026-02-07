"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { providers } from "../providers/registry"
import type { Quote, SwapResult, SwapToken } from "../providers/types"
import { useWalletContext } from "../wallet/context"
import Details from "./details"
import { fmt, modules } from "./modules"
import Refresh from "./refresh"
import Selector from "./selector"
import Settings, { useSlippage } from "./settings"
import Status from "./status"

export default function SwapForm({ providerId, chainId }: { providerId: string; chainId: number }) {
	const mod = modules[providerId]
	const tokenList = useMemo(() => mod.tokens(chainId), [mod, chainId])
	const [input, setInput] = useState<SwapToken>(tokenList[0])
	const [output, setOutput] = useState<SwapToken>(tokenList[1])
	const [amount, setAmount] = useState("1")
	const [quote, setQuote] = useState<Quote | null>(null)
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<SwapResult | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [flipped, setFlipped] = useState(false)
	const timer = useRef<ReturnType<typeof setTimeout>>(null)
	const refreshKey = useRef(0)
	const { connected, address, signer, connect, chain } = useWalletContext()
	const { slippage, setSlippage } = useSlippage()

	useEffect(() => {
		setInput(tokenList[0])
		setOutput(tokenList[1])
		setQuote(null)
		setAmount("1")
	}, [tokenList])

	const fetchQuote = useCallback(async () => {
		setError(null)
		const n = Number.parseFloat(amount)
		if (!n || n <= 0) {
			setQuote(null)
			return
		}
		if (input.address === output.address) {
			setError("select different tokens")
			setQuote(null)
			return
		}
		setLoading(true)
		try {
			const q = await mod.quote({ input, output, amount, sender: address ?? undefined, slippage })
			if (q) {
				setQuote(q)
			} else {
				setQuote(null)
				setError("no route found")
			}
		} catch {
			setQuote(null)
			setError("quote unavailable")
		}
		setLoading(false)
	}, [mod, input, output, amount, address, slippage])

	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(fetchQuote, 500)
		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [fetchQuote])

	const flip = () => {
		setFlipped((f) => !f)
		refreshKey.current++
		const prev = input
		setInput(output)
		setOutput(prev)
		if (quote)
			setAmount(
				Number.parseFloat(quote.outputAmount)
					.toFixed(6)
					.replace(/\.?0+$/, ""),
			)
	}

	const execute = async () => {
		if (!quote || !connected || !signer || !address) return
		setResult({ status: "pending" })
		const res = await mod.swap({ quote, sender: address, signer, slippage })
		setResult(res)
	}

	const prov = providers.find((p) => p.id === providerId)

	return (
		<div className="relative rounded-2xl border border-white/[0.06] bg-[#1e1c1a] p-4 md:p-5">
			<Status result={result} onClose={() => setResult(null)} />

			<div className="mb-3 flex items-center justify-between px-1">
				<div className="flex items-center gap-2 text-[11px] text-white/20">
					<span className="relative flex h-1.5 w-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BCEC79] opacity-75" />
						<span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
					</span>
					{prov?.name}
				</div>
				<div className="flex items-center gap-2">
					{loading && <span className="text-[11px] text-white/20">quoting...</span>}
					{!loading && quote && (
						<>
							<Refresh key={refreshKey.current} onRefresh={fetchQuote} />
							<span className="font-mono text-[11px] text-white/30">
								1 {input.symbol} = {fmt(quote.rate)} {output.symbol}
							</span>
						</>
					)}
					<Settings slippage={slippage} onChange={setSlippage} />
				</div>
			</div>

			<div className="rounded-xl bg-white/[0.03] p-4">
				<span className="text-[11px] text-white/25">you pay</span>
				<div className="mt-2 flex items-center justify-between gap-3">
					<input
						type="text"
						inputMode="decimal"
						value={amount}
						onChange={(e) => {
							setAmount(e.target.value.replace(/[^0-9.]/g, ""))
							refreshKey.current++
						}}
						className="w-0 min-w-0 flex-1 bg-transparent text-2xl font-medium text-white outline-none placeholder:text-white/20 md:text-3xl"
						placeholder="0"
					/>
					<Selector token={input} tokens={tokenList} onSelect={setInput} exclude={output.address} />
				</div>
			</div>

			<div className="relative my-1 flex justify-center">
				<button
					type="button"
					onClick={flip}
					className="absolute -top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1e1c1a] text-white/30 transition-all duration-200 hover:text-white/50"
					style={{ transform: flipped ? "rotate(180deg)" : "rotate(0deg)" }}
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
					{loading ? (
						<span
							className="inline-block h-8 w-32 rounded-lg bg-white/[0.06]"
							style={{ animation: "shimmer 1.5s ease-in-out infinite" }}
						/>
					) : (
						<span className="text-2xl font-medium text-white md:text-3xl">
							{quote ? fmt(Number.parseFloat(quote.outputAmount)) : "\u2014"}
						</span>
					)}
					<Selector
						token={output}
						tokens={tokenList}
						onSelect={setOutput}
						exclude={input.address}
					/>
				</div>
				{error && <div className="mt-2 text-[12px] text-red-400/60">{error}</div>}
			</div>

			{quote && (
				<Details
					quote={quote}
					input={input}
					slippage={slippage}
					chain={chain}
					color={prov?.color}
				/>
			)}

			{connected ? (
				<button
					type="button"
					disabled={!quote}
					onClick={execute}
					className="mt-4 w-full rounded-xl bg-[#EC4612] py-3.5 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-30 disabled:hover:brightness-100 md:py-4"
				>
					swap
				</button>
			) : (
				<button
					type="button"
					onClick={() => connect(chain)}
					className="mt-4 w-full rounded-xl bg-[#EC4612] py-3.5 text-sm font-medium text-white transition-all hover:brightness-110 md:py-4"
				>
					connect wallet
				</button>
			)}
		</div>
	)
}
