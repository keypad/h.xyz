import type { Quote, SwapToken } from "../providers/types"
import { fmt } from "./modules"

function impact(quote: Quote): number | null {
	if (!quote.rate || quote.rate <= 0) return null
	const mid = Number.parseFloat(quote.inputAmount) * quote.rate
	const out = Number.parseFloat(quote.outputAmount)
	if (mid <= 0) return null
	return ((mid - out) / mid) * 100
}

export default function Details({
	quote,
	input,
	slippage,
	chain,
	color,
}: {
	quote: Quote
	input: SwapToken
	slippage: number
	chain: string
	color?: string
}) {
	const pi = impact(quote)

	return (
		<div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/[0.04] px-4 py-3">
			<Row label="rate">
				<span className="font-mono text-white/35">
					1 {input.symbol} = {fmt(quote.rate)} {quote.output.symbol}
				</span>
			</Row>
			<Row label="min. received">
				<span className="font-mono text-white/35">
					{fmt(Number.parseFloat(quote.outputAmount) * (1 - slippage / 100))} {quote.output.symbol}
				</span>
			</Row>
			{pi != null && pi > 0.01 && (
				<Row label="price impact">
					<span className={pi > 3 ? "text-[#EC4612]" : pi > 1 ? "text-[#EC4612]/60" : ""}>
						{pi.toFixed(2)}%{pi > 5 ? " (high)" : ""}
					</span>
				</Row>
			)}
			{quote.route && <Row label="route">{quote.route}</Row>}
			{quote.fee && <Row label="fees">{quote.fee}</Row>}
			<Row label="slippage">
				<span className={slippage > 3 ? "text-[#EC4612]" : ""}>
					{slippage}%{slippage > 3 ? " (high)" : ""}
				</span>
			</Row>
			<Row label="network">
				<div className="flex items-center gap-1.5">
					<span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
					{chain}
				</div>
			</Row>
		</div>
	)
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-between text-[12px]">
			<span className="text-white/20">{label}</span>
			<span className="text-white/35">{children}</span>
		</div>
	)
}
