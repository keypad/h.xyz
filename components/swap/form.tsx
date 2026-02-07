"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { providers } from "../providers/registry"
import type { Quote, SwapResult, SwapToken } from "../providers/types"
import ConnectButton from "../wallet/connect"
import { useWalletContext } from "../wallet/context"
import Details from "./details"
import { classify, withRetry, withTimeout } from "./errors"
import { fmt, modules } from "./modules"
import { FlipButton, PayPanel, ReceivePanel, SwapButton } from "./panels"
import Refresh from "./refresh"
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
	const [destination, setDestination] = useState("")
	const timer = useRef<ReturnType<typeof setTimeout>>(null)
	const refreshKey = useRef(0)
	const mounted = useRef(false)
	const abort = useRef<AbortController | null>(null)
	const { connected, address, signer, chain } = useWalletContext()
	const { slippage, setSlippage } = useSlippage()
	const isHoudini = providerId === "houdini"

	useEffect(() => {
		setInput(tokenList[0])
		setOutput(tokenList[1])
		setQuote(null)
		setAmount("1")
	}, [tokenList])

	const fetchQuote = useCallback(async () => {
		abort.current?.abort()
		abort.current = new AbortController()
		const signal = abort.current.signal
		setError(null)
		const n = Number.parseFloat(amount)
		if (!n || n <= 0) {
			setQuote(null)
			setError(!amount || amount === "0" ? "enter an amount" : null)
			return
		}
		if (input.address === output.address) {
			setError("same token")
			setQuote(null)
			return
		}
		setLoading(true)
		try {
			const sender = isHoudini ? destination || undefined : (address ?? undefined)
			const q = await withRetry(
				(s) => withTimeout(mod.quote({ input, output, amount, sender, slippage }), 10000, s),
				signal,
			)
			if (signal.aborted) return
			if (q) setQuote(q)
			else {
				setQuote(null)
				setError("no route")
			}
		} catch (e) {
			if (signal.aborted) return
			setQuote(null)
			setError(classify(e))
		}
		setLoading(false)
	}, [mod, input, output, amount, address, slippage, isHoudini, destination])

	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		if (!mounted.current) {
			mounted.current = true
			fetchQuote()
		} else timer.current = setTimeout(fetchQuote, 200)
		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [fetchQuote])

	const flip = () => {
		setFlipped((f) => !f)
		refreshKey.current++
		setInput(output)
		setOutput(input)
		if (quote) setAmount(Number.parseFloat(quote.outputAmount).toFixed(6).replace(/\.?0+$/, ""))
	}

	const execute = async () => {
		const sender = isHoudini ? destination : address
		if (!quote || !sender || (!isHoudini && (!connected || !signer))) return
		setResult({ status: "pending" })
		try {
			setResult(await mod.swap({ quote, sender, signer, slippage }))
		} catch (e: any) {
			const msg = (e?.message ?? "").toLowerCase()
			const rejected = msg.includes("reject") || msg.includes("denied") || msg.includes("cancel")
			setResult(rejected ? null : { status: "error", message: "failed" })
		}
	}

	const prov = providers.find((p) => p.id === providerId)
	const submit = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.repeat) execute()
	}

	return (
		<div
			className="relative rounded-2xl border border-white/[0.06] bg-[#1e1c1a] p-4 md:p-5"
			onKeyDown={submit}
		>
			<Status result={result} onClose={() => setResult(null)} />
			<div className="mb-3 flex items-center justify-between px-1">
				<div className="flex items-center gap-2 text-[11px] text-white/20">
					<span className="relative flex h-1.5 w-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BCEC79] opacity-75" />
						<span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
					</span>
					{prov?.name}
					{prov?.tag && <span className="text-white/10">· {prov.tag}</span>}
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
			<PayPanel
				amount={amount}
				token={input}
				tokens={tokenList}
				exclude={output.address}
				onAmount={(v) => {
					setAmount(v)
					refreshKey.current++
				}}
				onSelect={setInput}
			/>
			<FlipButton flipped={flipped} onFlip={flip} />
			<ReceivePanel
				quote={quote}
				loading={loading}
				error={error}
				token={output}
				tokens={tokenList}
				exclude={input.address}
				onSelect={setOutput}
			/>
			<div
				className={`overflow-hidden transition-all duration-200 ${quote ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
			>
				{quote && (
					<Details
						quote={quote}
						input={input}
						slippage={slippage}
						chain={chain}
						color={prov?.color}
					/>
				)}
			</div>
			{isHoudini ? (
				<div className="mt-4 flex flex-col gap-2">
					<input
						type="text"
						value={destination}
						onChange={(e) => setDestination(e.target.value.trim())}
						placeholder="destination address"
						className="w-full rounded-xl bg-white/[0.06] px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-white/25"
					/>
					<SwapButton disabled={!quote || !destination} error={error} onClick={execute} />
				</div>
			) : !connected ? (
				<ConnectButton />
			) : (
				<div className="mt-4">
					<SwapButton disabled={!quote} error={error} onClick={execute} />
				</div>
			)}
		</div>
	)
}
