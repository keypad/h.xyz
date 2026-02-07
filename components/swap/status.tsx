"use client"

import type { SwapResult } from "../providers/types"

export default function Status({
	result,
	onClose,
}: {
	result: SwapResult | null
	onClose: () => void
}) {
	if (!result) return null

	return (
		<div
			className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-[#1e1c1a]/95 p-4 backdrop-blur-sm md:p-6"
			style={{ animation: "fadein 200ms ease-out" }}
		>
			{result.status === "pending" && (
				<>
					<div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#EC4612]" />
					<span className="text-sm text-white/60">processing</span>
				</>
			)}

			{result.status === "success" && (
				<>
					<div
						className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#BCEC79]/10"
						style={{ animation: "scalein 300ms ease-out" }}
					>
						<svg
							aria-hidden="true"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#BCEC79"
							strokeWidth="2"
						>
							<path d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<span className="mb-2 text-sm text-white/80">complete</span>
					{result.hash && (
						<span className="mb-4 break-all font-mono text-[11px] text-white/30">
							{result.hash.slice(0, 12)}...{result.hash.slice(-8)}
						</span>
					)}
					{result.explorer && (
						<a
							href={result.explorer}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[11px] text-[#EC4612] transition-opacity hover:opacity-80"
						>
							view on explorer
						</a>
					)}
					{result.message && (
						<span className="mt-2 text-center font-mono text-[11px] text-white/40">
							{result.message}
						</span>
					)}
				</>
			)}

			{result.status === "error" && (
				<>
					<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#EC4612]/10">
						<svg
							aria-hidden="true"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#EC4612"
							strokeWidth="2"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</div>
					<span className="text-sm text-white/60">{result.message || "failed"}</span>
				</>
			)}

			<button
				type="button"
				onClick={onClose}
				className="mt-6 rounded-lg px-5 py-2.5 text-xs text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/50 md:px-4 md:py-2"
			>
				close
			</button>
		</div>
	)
}
