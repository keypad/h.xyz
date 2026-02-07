import Client from "@/components/email/client"
import Header from "@/components/header"

export default function EmailPage() {
	return (
		<>
			<Header />
			<main className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6">
				<div className="mb-6 flex items-end justify-between">
					<div>
						<h1 className="font-serif text-4xl italic text-white sm:text-5xl">email</h1>
						<p className="mt-1.5 text-sm text-white/30">encrypted by default</p>
					</div>
					<div className="hidden items-center gap-6 text-[11px] text-white/20 sm:flex">
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
				</div>
				<Client />
			</main>
		</>
	)
}
