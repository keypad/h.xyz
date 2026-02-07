import Inbox from "@/components/inbox"

const names = ["hi", "you", "dev", "anon", "nft", "web"]

export default function Email() {
	return (
		<section id="email" className="px-6 py-24">
			<div className="mx-auto max-w-6xl">
				<span className="mb-6 inline-block rounded-full bg-[#f996ee]/10 px-4 py-1.5 text-xs font-medium text-[#f996ee]">
					email
				</span>
				<h2 className="max-w-lg font-serif text-5xl italic leading-tight tracking-tight text-white sm:text-6xl">
					the shortest email you'll own
				</h2>
				<p className="mt-4 max-w-md text-base leading-relaxed text-white/40">
					three characters after the @. end-to-end encrypted, wallet-linked, no personal data.
				</p>

				<div className="mt-12">
					<Inbox />
				</div>

				<div className="mt-4 flex flex-wrap gap-3">
					{names.map((name) => (
						<span
							key={name}
							className="rounded-full border border-white/5 bg-surface px-5 py-2.5 font-mono text-sm text-white/50"
						>
							{name}
							<span className="text-white/25">@h.xyz</span>
						</span>
					))}
					<a
						href="/app"
						className="rounded-full bg-[#f996ee] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
					>
						claim yours
					</a>
				</div>
			</div>
		</section>
	)
}
