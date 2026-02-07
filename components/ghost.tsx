export default function Ghost({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="-3 -3 70 54"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<g transform="translate(1,1)">
				<path d="M23,24 C23,24 29.6,17.5 39.1,24" />
				<path d="M0.4,29.2 L7,6.8 L17.2,0" />
				<path d="M61.7,29.2 L53.4,6.8 L43.4,0" />
				<circle cx="13.5" cy="32.5" r="13.5" />
				<circle cx="48.5" cy="32.5" r="13.5" />
				<path d="M15,42 C8.9,42 4,37.1 4,31" />
				<path d="M50,42 C43.9,42 39,37.1 39,31" />
			</g>
		</svg>
	)
}
