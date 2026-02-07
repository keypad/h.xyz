export type Chain = {
	id: number
	name: string
}

export const COW_CHAINS: Chain[] = [
	{ id: 1, name: "ethereum" },
	{ id: 100, name: "gnosis" },
	{ id: 42161, name: "arbitrum" },
	{ id: 8453, name: "base" },
]

export const UNI_CHAINS: Chain[] = [
	{ id: 1, name: "ethereum" },
	{ id: 137, name: "polygon" },
	{ id: 42161, name: "arbitrum" },
	{ id: 10, name: "optimism" },
	{ id: 8453, name: "base" },
]

export function chainsFor(providerId: string): Chain[] | null {
	if (providerId === "cow") return COW_CHAINS
	if (providerId === "uniswap") return UNI_CHAINS
	return null
}

export default function ChainSelector({
	chains,
	active,
	onChange,
}: {
	chains: Chain[]
	active: number
	onChange: (id: number) => void
}) {
	return (
		<div className="flex gap-1">
			{chains.map((c) => (
				<button
					key={c.id}
					type="button"
					onClick={() => onChange(c.id)}
					className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
						active === c.id
							? "bg-white/[0.06] text-white"
							: "text-white/30 hover:text-white/50"
					}`}
				>
					{c.name}
				</button>
			))}
		</div>
	)
}
