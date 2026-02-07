export default function Logo({ className }: { className?: string }) {
	return (
		<svg aria-hidden="true" viewBox="0 0 20 33" fill="currentColor" className={className}>
			<rect x="0" y="5" width="7" height="13" rx="3" />
			<rect x="0" y="20" width="7" height="13" rx="3" />
			<rect x="11" y="0" width="7" height="13" rx="3" />
			<rect x="11" y="15" width="7" height="13" rx="3" />
		</svg>
	)
}
