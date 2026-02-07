"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cow } from "../providers/cow"
import { debridge } from "../providers/debridge"
import { houdini } from "../providers/houdini"
import { jupiter } from "../providers/jupiter"
import { providers } from "../providers/registry"
import type { ChainType, ProviderModule, Quote, SwapResult, SwapToken } from "../providers/types"

import { uniswap } from "../providers/uniswap"
import { useWalletContext, WalletContextProvider } from "../wallet/context"
import Selector from "./selector"
import Status from "./status"

const modules: Record<string, ProviderModule> = {
	jupiter,
	cow,
	debridge,
	houdini,
	uniswap,
}

function fmt(n: number) {
	return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function chainFor(id: string): ChainType {
	const p = providers.find((p) => p.id === id)
	return p?.chains[0] ?? "evm"
}

function SwapForm({ providerId }: { providerId: string }) {
	const mod = modules[providerId]
	const tokenList = useMemo(() => mod.tokens(), [mod])
	const [input, setInput] = useState<SwapToken>(tokenList[0])
	const [output, setOutput] = useState<SwapToken>(tokenList[1])
	const [amount, setAmount] = useState("1")
	const [quote, setQuote] = useState<Quote | null>(null)
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<SwapResult | null>(null)
	const timer = useRef<ReturnType<typeof setTimeout>>(null)
	const { connected, address, signer, connect, chain } = useWalletContext()

	useEffect(() => {
		setInput(tokenList[0])
		setOutput(tokenList[1])
		setQuote(null)
		setAmount("1")
	}, [tokenList])

	const fetchQuote = useCallback(async () => {
		const n = Number.parseFloat(amount)
		if (!n || n <= 0) {
			setQuote(null)
			return
		}
		setLoading(true)
		try {
			const q = await mod.quote({ input, output, amount, sender: address ?? undefined })
			setQuote(q)
		} catch {
			setQuote(null)
		}
		setLoading(false)
	}, [mod, input, output, amount, address])

	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(fetchQuote, 500)
		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [fetchQuote])

	const flip = () => {
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
		const res = await mod.swap({ quote, sender: address, signer })
		setResult(res)
	}

	const prov = providers.find((p) => p.id === providerId)

	return (
		<div className="relative rounded-2xl border border-white/[0.06] bg-[#1e1c1a] p-5">
			<Status result={result} onClose={() => setResult(null)} />

			<div className="mb-3 flex items-center justify-between px-1">
				<div className="flex items-center gap-2 text-[11px] text-white/20">
					<span className="relative flex h-1.5 w-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BCEC79] opacity-75" />
						<span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
					</span>
					{prov?.name}
				</div>
				{loading && <span className="text-[11px] text-white/20">quoting...</span>}
				{!loading && quote && (
					<span className="font-mono text-[11px] text-white/30">
						1 {input.symbol} = {fmt(quote.rate)} {output.symbol}
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
					<Selector token={input} tokens={tokenList} onSelect={setInput} exclude={output.address} />
				</div>
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
						{quote ? fmt(Number.parseFloat(quote.outputAmount)) : "—"}
					</span>
					<Selector
						token={output}
						tokens={tokenList}
						onSelect={setOutput}
						exclude={input.address}
					/>
				</div>
			</div>

			{quote && (
				<div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/[0.04] px-4 py-3">
					<div className="flex items-center justify-between text-[12px]">
						<span className="text-white/20">rate</span>
						<span className="font-mono text-white/35">
							1 {input.symbol} = {fmt(quote.rate)} {output.symbol}
						</span>
					</div>
					{quote.route && (
						<div className="flex items-center justify-between text-[12px]">
							<span className="text-white/20">route</span>
							<span className="text-white/35">{quote.route}</span>
						</div>
					)}
					{quote.fee && (
						<div className="flex items-center justify-between text-[12px]">
							<span className="text-white/20">fees</span>
							<span className="text-white/35">{quote.fee}</span>
						</div>
					)}
					<div className="flex items-center justify-between text-[12px]">
						<span className="text-white/20">network</span>
						<div className="flex items-center gap-1.5 text-white/35">
							<span className="h-1.5 w-1.5 rounded-full" style={{ background: prov?.color }} />
							{chain}
						</div>
					</div>
				</div>
			)}

			{connected ? (
				<button
					type="button"
					disabled={!quote}
					onClick={execute}
					className="mt-4 w-full rounded-xl bg-[#EC4612] py-4 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-30 disabled:hover:brightness-100"
				>
					swap
				</button>
			) : (
				<button
					type="button"
					onClick={() => connect(chain)}
					className="mt-4 w-full rounded-xl bg-[#EC4612] py-4 text-sm font-medium text-white transition-all hover:brightness-110"
				>
					connect wallet
				</button>
			)}
		</div>
	)
}

export default function Panel() {
	const [active, setActive] = useState("jupiter")
	const chain = chainFor(active)

	return (
		<WalletContextProvider chain={chain}>
			<div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
				{providers.map((p) => (
					<button
						key={p.id}
						type="button"
						onClick={() => setActive(p.id)}
						className={`relative flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
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

			<div className="mt-4">
				<SwapForm providerId={active} />
			</div>
		</WalletContextProvider>
	)
}
