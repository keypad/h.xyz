function seed(n: number) {
	const x = Math.sin(n) * 10000
	return x - Math.floor(x)
}

const rows = 6
const cols = 16
const opacities = Array.from({ length: rows * cols }).map((_, i) => {
	return Math.round((seed(i + 1) * 0.5 + 0.08) * 100) / 100
})

export default function Pattern() {
	return (
		<div
			className="my-8 grid font-mono text-lg select-none"
			style={{
				gridTemplateColumns: `repeat(${cols}, auto)`,
				justifyContent: "space-between",
				rowGap: "4px",
			}}
			aria-hidden="true"
		>
			{opacities.map((opacity, i) => (
				<span key={i} className="text-white" style={{ opacity }}>
					+
				</span>
			))}
		</div>
	)
}
