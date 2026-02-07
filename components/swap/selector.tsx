"use client"

import { useState } from "react"
import type { SwapToken } from "../providers/types"
import Avatar from "./avatar"
import Modal from "./modal"

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
