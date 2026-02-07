export default function Pixel({ grid, className }: { grid: string[]; className?: string }) {
	const h = grid.length
	const w = grid[0].length
	return (
		<svg
			aria-hidden="true"
			viewBox={`0 0 ${w} ${h}`}
			className={className}
			shapeRendering="crispEdges"
		>
			{grid.map((row, y) =>
				[...row].map((cell, x) =>
					cell === "X" ? (
						<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
					) : null,
				),
			)}
		</svg>
	)
}
