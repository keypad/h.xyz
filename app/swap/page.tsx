import type { Metadata } from "next"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Panel from "@/components/swap/panel"

export const metadata: Metadata = {
	title: "swap",
	description: "swap tokens across 5 providers. mev protection. zero logging. zero tracking.",
}

export default function SwapPage() {
	return (
		<>
			<Header />
			<main className="mx-auto max-w-lg px-4 pt-24 pb-16 sm:px-6 md:pt-32 md:pb-24">
				<h1 className="font-serif text-4xl italic text-white sm:text-5xl">swap</h1>
				<p className="mt-2 text-sm text-white/40">choose your route. zero logging.</p>

				<div className="mt-6 sm:mt-8">
					<Panel />
				</div>

				<div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-white/20 sm:mt-8 sm:gap-6">
					<div className="flex items-center gap-1.5">
						<span className="h-1 w-1 rounded-full bg-[#BCEC79]" />
						zero logging
					</div>
					<div className="flex items-center gap-1.5">
						<span className="h-1 w-1 rounded-full bg-[#BCEC79]" />
						no tracking
					</div>
					<div className="flex items-center gap-1.5">
						<span className="h-1 w-1 rounded-full bg-[#BCEC79]" />
						private
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}
