const rays = [
	{ a: 0, l: 1.0, t: [0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.85] },
	{ a: 30, l: 0.52, t: [0.25, 0.5, 0.75] },
	{ a: 55, l: 0.38, t: [0.35, 0.7] },
	{ a: 80, l: 0.65, t: [0.2, 0.4, 0.65] },
	{ a: 105, l: 0.42, t: [0.3, 0.6] },
	{ a: 130, l: 0.78, t: [0.15, 0.3, 0.5, 0.7] },
	{ a: 155, l: 0.45, t: [0.25, 0.55] },
	{ a: 180, l: 0.7, t: [0.2, 0.4, 0.6, 0.8] },
	{ a: 205, l: 0.55, t: [0.3, 0.6] },
	{ a: 230, l: 0.85, t: [0.1, 0.25, 0.4, 0.55, 0.7] },
	{ a: 255, l: 0.35, t: [0.4, 0.7] },
	{ a: 280, l: 0.6, t: [0.2, 0.45, 0.7] },
	{ a: 310, l: 0.72, t: [0.15, 0.35, 0.55, 0.75] },
	{ a: 340, l: 0.48, t: [0.3, 0.6] },
]

const center = 200
const radius = 190
const tick = 5

export default function Starburst({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 400 400"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		>
			<circle cx={center} cy={center} r="2" fill="currentColor" stroke="none" />
			{rays.map((ray, i) => {
				const rad = (ray.a * Math.PI) / 180
				const r = radius * ray.l
				const ex = center + Math.cos(rad) * r
				const ey = center + Math.sin(rad) * r
				const px = -Math.sin(rad)
				const py = Math.cos(rad)

				return (
					<g key={i}>
						<line x1={center} y1={center} x2={ex} y2={ey} />
						{ray.t.map((p, j) => {
							const mx = center + Math.cos(rad) * r * p
							const my = center + Math.sin(rad) * r * p
							return (
								<line
									key={j}
									x1={mx - px * tick}
									y1={my - py * tick}
									x2={mx + px * tick}
									y2={my + py * tick}
								/>
							)
						})}
					</g>
				)
			})}
		</svg>
	)
}
