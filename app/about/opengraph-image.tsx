import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "about | h.xyz"
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
					width: 120,
					height: 120,
					borderRadius: 24,
					background: "#242220",
					border: "1px solid rgba(255,255,255,0.06)",
					marginBottom: 32,
				}}
			>
				<span style={{ fontSize: 64, fontWeight: 700, color: "#faf8f5" }}>h</span>
			</div>
			<span style={{ fontSize: 48, fontWeight: 600, color: "#faf8f5", letterSpacing: -1 }}>
				about h.xyz
			</span>
			<span style={{ fontSize: 18, color: "rgba(255,255,255,0.35)", marginTop: 12 }}>
				swap tokens. encrypted email. zero tracking.
			</span>
			<div
				style={{
					display: "flex",
					gap: 16,
					marginTop: 32,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "8px 16px",
						borderRadius: 12,
						background: "rgba(236,70,18,0.15)",
						fontSize: 14,
						color: "#EC4612",
					}}
				>
					swap
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "8px 16px",
						borderRadius: 12,
						background: "rgba(249,150,238,0.15)",
						fontSize: 14,
						color: "#f996ee",
					}}
				>
					email
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "8px 16px",
						borderRadius: 12,
						background: "rgba(188,236,121,0.15)",
						fontSize: 14,
						color: "#BCEC79",
					}}
				>
					private
				</div>
			</div>
		</div>,
		{ ...size },
	)
}
