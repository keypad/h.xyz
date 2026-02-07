import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "swap | h.xyz"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const providers = [
	{ name: "jupiter", color: "#9945FF" },
	{ name: "cow", color: "#012D72" },
	{ name: "debridge", color: "#6944BA" },
	{ name: "houdini", color: "#7B2FBF" },
	{ name: "uniswap", color: "#FF007A" },
]

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
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 3,
					background: "linear-gradient(90deg, transparent 0%, #EC4612 50%, transparent 100%)",
					display: "flex",
				}}
			/>

			<div
				style={{
					position: "absolute",
					top: 32,
					right: 40,
					display: "flex",
					alignItems: "center",
					gap: 8,
				}}
			>
				<div
					style={{
						width: 28,
						height: 28,
						borderRadius: 6,
						background: "#242220",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						border: "1px solid rgba(255,255,255,0.06)",
					}}
				>
					<span style={{ fontSize: 16, fontWeight: 700, color: "#faf8f5" }}>h</span>
				</div>
				<span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>h.xyz</span>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "baseline",
					gap: 16,
					marginBottom: 12,
				}}
			>
				<div
					style={{
						width: 10,
						height: 10,
						borderRadius: "50%",
						background: "#EC4612",
						marginBottom: 8,
						display: "flex",
					}}
				/>
				<span
					style={{
						fontSize: 96,
						fontFamily: "serif",
						fontStyle: "italic",
						fontWeight: 400,
						color: "#faf8f5",
						letterSpacing: -2,
					}}
				>
					swap
				</span>
			</div>

			<span
				style={{
					fontSize: 20,
					color: "rgba(255,255,255,0.4)",
					marginTop: 0,
					letterSpacing: 0.5,
				}}
			>
				choose your route. zero logging.
			</span>

			<div
				style={{
					display: "flex",
					gap: 6,
					marginTop: 48,
				}}
			>
				{providers.map((p) => (
					<div
						key={p.name}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 6,
							padding: "6px 14px",
							borderRadius: 20,
							background: "rgba(255,255,255,0.03)",
							border: "1px solid rgba(255,255,255,0.06)",
							fontSize: 13,
							color: "rgba(255,255,255,0.3)",
						}}
					>
						<div
							style={{
								width: 6,
								height: 6,
								borderRadius: "50%",
								background: p.color,
								display: "flex",
							}}
						/>
						{p.name}
					</div>
				))}
			</div>

			<div
				style={{
					position: "absolute",
					bottom: 32,
					display: "flex",
					gap: 24,
					fontSize: 12,
					color: "rgba(255,255,255,0.15)",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div
						style={{
							width: 5,
							height: 5,
							borderRadius: "50%",
							background: "#BCEC79",
							display: "flex",
						}}
					/>
					zero logging
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div
						style={{
							width: 5,
							height: 5,
							borderRadius: "50%",
							background: "#BCEC79",
							display: "flex",
						}}
					/>
					no tracking
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<div
						style={{
							width: 5,
							height: 5,
							borderRadius: "50%",
							background: "#BCEC79",
							display: "flex",
						}}
					/>
					private
				</div>
			</div>
		</div>,
		{ ...size },
	)
}
