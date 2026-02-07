"use client"

import { useEffect } from "react"

const INTERVAL = 30000

export default function Refresh({ onRefresh }: { onRefresh: () => void }) {
	useEffect(() => {
		const id = setTimeout(onRefresh, INTERVAL)
		return () => clearTimeout(id)
	}, [onRefresh])

	return (
		<svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0" aria-hidden="true">
			<circle cx="8" cy="8" r="7" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="1.5" />
			<circle
				cx="8"
				cy="8"
				r="7"
				fill="none"
				stroke="white"
				strokeOpacity="0.2"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeDasharray="44"
				strokeDashoffset="44"
				style={{
					animation: `progress ${INTERVAL}ms linear forwards`,
					transformOrigin: "center",
					transform: "rotate(-90deg)",
				}}
			/>
		</svg>
	)
}
