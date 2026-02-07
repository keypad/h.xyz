import Swapcard from "@/components/swapcard"

export default function Swap() {
	return (
		<section id="swap" className="px-6 py-24">
			<div className="mx-auto max-w-6xl">
				<div className="rounded-[2rem] bg-surface p-6 md:p-12 lg:p-16">
					<div className="grid items-center gap-12 md:grid-cols-2">
						<div>
							<span className="mb-6 inline-block rounded-full bg-[#EC4612] px-4 py-1.5 text-xs font-medium text-white">
								swap
							</span>
							<h2 className="font-serif text-5xl italic leading-tight tracking-tight text-white sm:text-6xl">
								trade without
								<br />
								getting frontrun
							</h2>
							<p className="mt-6 text-base leading-relaxed text-white/50">
								batch auctions protect every trade from mev extraction. solvers compete for best
								execution across all dexes with surplus returned to you.
							</p>
							<div className="mt-8 flex flex-col gap-3">
								{[
									"mev protection by default",
									"best price across all dexes",
									"gasless transactions",
								].map((feature) => (
									<div key={feature} className="flex items-center gap-3 text-sm text-white/45">
										<span className="h-px w-5 bg-[#EC4612]" />
										{feature}
									</div>
								))}
							</div>
						</div>

						<Swapcard />
					</div>
				</div>
			</div>
		</section>
	)
}
