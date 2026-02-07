import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "swap | h.xyz"
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
			<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: "50%",
						background: "#EC4612",
					}}
				/>
				<span style={{ fontSize: 48, fontWeight: 600, color: "#faf8f5", letterSpacing: -1 }}>
					swap
				</span>
			</div>
			<span style={{ fontSize: 20, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
				5 providers. best rates. zero logging.
			</span>
			<div
				style={{
					display: "flex",
					gap: 24,
					marginTop: 40,
					fontSize: 14,
					color: "rgba(255,255,255,0.25)",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9945FF" }} />
					jupiter
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div style={{ width: 6, height: 6, borderRadius: "50%", background: "#012D72" }} />
					cow
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6944BA" }} />
					debridge
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7B2FBF" }} />
					houdini
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF007A" }} />
					uniswap
				</div>
			</div>
		</div>,
		{ ...size },
	)
}
