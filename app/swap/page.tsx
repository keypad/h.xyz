import Footer from "@/components/footer"
import Header from "@/components/header"
import Panel from "@/components/swap/panel"

export default function SwapPage() {
	return (
		<>
			<Header />
			<main className="mx-auto max-w-lg px-6 pt-32 pb-24">
				<h1 className="font-serif text-5xl italic text-white">swap</h1>
				<p className="mt-2 text-sm text-white/40">choose your route. zero logging.</p>

				<div className="mt-8">
					<Panel />
				</div>

				<div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-white/20">
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
