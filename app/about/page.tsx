import type { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/footer"
import Header from "@/components/header"

export const metadata: Metadata = {
	title: "about",
	description: "h.xyz — swap tokens and claim encrypted email. zero tracking, zero compromise.",
}

const features = [
	{
		label: "swap",
		color: "#EC4612",
		description: "5 providers. best rates across jupiter, cow protocol, debridge, houdini swap, and uniswap. mev protection. cross-chain bridges. privacy routes. you choose.",
	},
	{
		label: "email",
		color: "#f996ee",
		description: "claim your @h.xyz address. end-to-end encrypted. client-side keys. we can't read your messages even if we wanted to.",
	},
	{
		label: "private",
		color: "#BCEC79",
		description: "zero analytics. zero cookies. zero tracking. no ip logging. no fingerprinting. api proxies strip identifying headers. your data stays yours.",
	},
]

export default function AboutPage() {
	return (
		<>
			<Header />
			<main className="mx-auto max-w-2xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
				<h1 className="font-serif text-4xl italic text-white sm:text-5xl">about</h1>
				<p className="mt-4 text-[15px] leading-[1.8] text-white/40">
					h.xyz is a privacy-first crypto platform. swap tokens across multiple providers,
					send encrypted email, and do it all without anyone watching.
				</p>

				<div className="mt-10 flex flex-col gap-6">
					{features.map((f) => (
						<div key={f.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
							<div className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full" style={{ background: f.color }} />
								<h2 className="text-[15px] font-medium text-white">{f.label}</h2>
							</div>
							<p className="mt-2 text-[13px] leading-[1.8] text-white/35">{f.description}</p>
						</div>
					))}
				</div>

				<div className="mt-10 flex flex-col gap-3">
					<h2 className="text-[15px] font-medium text-white/80">why h.xyz?</h2>
					<p className="text-[13px] leading-[1.8] text-white/35">
						single-letter domains are rare. we use that energy: confident, minimal, powerful.
						no bloat, no upsells, no data harvesting. just tools that work and respect your privacy.
					</p>
				</div>

				<div className="mt-10 flex gap-3">
					<Link
						href="/swap"
						className="rounded-xl bg-[#EC4612] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
					>
						start swapping
					</Link>
					<Link
						href="/email"
						className="rounded-xl border border-white/[0.06] px-5 py-3 text-sm font-medium text-white/60 transition-colors hover:border-white/10 hover:text-white/80"
					>
						try email
					</Link>
				</div>
			</main>
			<Footer />
		</>
	)
}
