"use client"

import type { SwapToken } from "../providers/types"
import { fmt } from "./modules"
import Selector from "./selector"

export function PayPanel({
	amount,
	token,
	tokens,
	exclude,
	onAmount,
	onSelect,
}: {
	amount: string
	token: SwapToken
	tokens: SwapToken[]
	exclude: string
	onAmount: (v: string) => void
	onSelect: (t: SwapToken) => void
}) {
	return (
		<div className="rounded-xl bg-white/[0.03] p-4">
			<span className="text-[11px] text-white/25">you pay</span>
			<div className="mt-2 flex items-center justify-between gap-3">
				<input
					type="text"
					inputMode="decimal"
					value={amount}
					onFocus={(e) => e.target.select()}
					onChange={(e) => {
						let v = e.target.value.replace(/[^0-9.]/g, "")
						if (v.split(".").length > 2) v = v.slice(0, v.lastIndexOf("."))
						onAmount(v)
					}}
					className="w-0 min-w-0 flex-1 bg-transparent text-2xl font-medium text-white outline-none placeholder:text-white/20 md:text-3xl"
					placeholder="0"
				/>
				<Selector token={token} tokens={tokens} onSelect={onSelect} exclude={exclude} />
			</div>
		</div>
	)
}

export function ReceivePanel({
	quote,
	loading,
	error,
	token,
	tokens,
	exclude,
	onSelect,
}: {
	quote: { outputAmount: string } | null
	loading: boolean
	error: string | null
	token: SwapToken
	tokens: SwapToken[]
	exclude: string
	onSelect: (t: SwapToken) => void
}) {
	return (
		<div className="rounded-xl bg-white/[0.03] p-4">
			<span className="text-[11px] text-white/25">you receive</span>
			<div className="mt-2 flex items-center justify-between gap-3">
				{loading ? (
					<div className="h-8 w-32 animate-pulse rounded-lg bg-white/[0.06] md:h-9" />
				) : (
					<span
						className={`text-2xl font-medium md:text-3xl ${quote ? "text-white" : "text-white/15"}`}
					>
						{quote ? fmt(Number.parseFloat(quote.outputAmount)) : "0"}
					</span>
				)}
				<Selector token={token} tokens={tokens} onSelect={onSelect} exclude={exclude} />
			</div>
			{error && error !== "enter an amount" && (
				<span className="mt-2 block text-[11px] text-white/20">{error}</span>
			)}
		</div>
	)
}

export function SwapButton({
	disabled,
	error,
	onClick,
}: {
	disabled: boolean
	error: string | null
	onClick: () => void
}) {
	const hasError = error && error !== "enter an amount"
	return (
		<button
			type="button"
			disabled={disabled || !!hasError}
			onClick={onClick}
			className={`w-full rounded-xl py-3.5 text-sm font-medium transition-all md:py-4 ${
				hasError
					? "bg-white/[0.04] text-white/25"
					: "bg-[#EC4612] text-white hover:brightness-110 disabled:opacity-30 disabled:hover:brightness-100"
			}`}
		>
			{hasError || "swap"}
		</button>
	)
}

export function LiveDot() {
	return (
		<span className="relative flex h-1.5 w-1.5">
			<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BCEC79] opacity-75" />
			<span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
		</span>
	)
}

export function FlipButton({ flipped, onFlip }: { flipped: boolean; onFlip: () => void }) {
	return (
		<div className="relative my-1 flex justify-center">
			<button
				type="button"
				onClick={onFlip}
				className="absolute -top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1e1c1a] text-white/30 transition-all duration-200 hover:text-white/50 active:scale-95"
			>
				<svg
					aria-hidden="true"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="transition-transform duration-200"
					style={{ transform: flipped ? "rotate(180deg)" : "none" }}
				>
					<path d="M12 5v14m0 0l-4-4m4 4l4-4" />
				</svg>
			</button>
		</div>
	)
}
