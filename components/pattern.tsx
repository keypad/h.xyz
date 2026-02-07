function seed(n: number) {
	const x = Math.sin(n) * 10000
	return x - Math.floor(x)
}

const cols = 16
const opacities = Array.from({ length: 6 * cols }).map((_, i) => {
	return Math.round((seed(i + 1) * 0.5 + 0.08) * 100) / 100
})

export default function Pattern() {
	return (
		<div
			className="my-8 grid grid-cols-[repeat(10,auto)] justify-between gap-y-1 font-mono text-lg select-none md:grid-cols-[repeat(16,auto)]"
			aria-hidden="true"
		>
			{opacities.map((opacity, i) => (
				<span key={i} className="text-center text-white" style={{ opacity }}>
					+
				</span>
			))}
		</div>
	)
}
