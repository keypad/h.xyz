import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "privacy | h.xyz"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "#1a1816",
				fontFamily: "sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: 80,
					height: 80,
					borderRadius: 20,
					background: "rgba(188,236,121,0.1)",
					marginBottom: 32,
				}}
			>
				<span style={{ fontSize: 36, color: "#BCEC79" }}>&#128274;</span>
			</div>
			<span style={{ fontSize: 48, fontWeight: 600, color: "#faf8f5", letterSpacing: -1 }}>
				privacy
			</span>
			<span style={{ fontSize: 18, color: "rgba(255,255,255,0.35)", marginTop: 12 }}>
				h.xyz — zero logging. zero tracking. zero compromise.
			</span>
		</div>,
		{ ...size },
	)
}
