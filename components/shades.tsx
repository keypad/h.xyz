const grid = [
	".KKKKKKKKKKKKKKKKKK.",
	"KWWWWWWWWKKWWWWWWWWK",
	"KWBCCCCBWKKWOYYYYOWK",
	"KWBBCCBBWKKWOOYYOOWK",
	"KWBBBBBBWKKWOOOOOOWK",
	"KWWWWWWWWKKWWWWWWWWK",
	".KWWWWWWWKKWWWWWWWK.",
	"..KKKKKKKKKKKKKKKK..",
]

const palette: Record<string, string> = {
	K: "#333",
	W: "#fff",
	B: "#3b82f6",
	C: "#67e8f9",
	O: "#EC4612",
	Y: "#fb923c",
}

export default function Shades({ className }: { className?: string }) {
	return (
		<svg aria-hidden="true" viewBox="0 0 20 8" className={className} shapeRendering="crispEdges">
			{grid.map((row, y) =>
				[...row].map((cell, x) =>
					cell !== "." ? (
						<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={palette[cell]} />
					) : null,
				),
			)}
		</svg>
	)
}
