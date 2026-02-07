import Pattern from "@/components/pattern"

export default function Hero() {
	return (
		<section className="px-6 pt-40 pb-24">
			<div className="mx-auto max-w-6xl" style={{ animation: "fadein 1s ease-out" }}>
				<Pattern />
				<h1 className="mb-4 text-3xl font-medium leading-snug text-white md:text-4xl">
					<span className="text-[#EC4612]">swap</span> tokens with mev protection. claim your{" "}
					<span className="font-mono text-[#f996ee]">@h.xyz</span> email. all with{" "}
					<span className="text-[#BCEC79]">zero tracking</span>.
				</h1>
				<p className="mb-8 italic text-white/40">your keys. your data. your identity.</p>
				<div className="flex gap-3">
					<a
						href="#swap"
						className="rounded-lg border border-white/15 px-5 py-3 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/5"
					>
						explore
					</a>
					<a
						href="/app"
						className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-fg transition-opacity hover:opacity-90"
					>
						launch app
					</a>
				</div>
			</div>
		</section>
	)
}
