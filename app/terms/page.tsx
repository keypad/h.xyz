import type { Metadata } from "next"
import Footer from "@/components/footer"
import Header from "@/components/header"

export const metadata: Metadata = {
	title: "terms",
	description: "h.xyz terms of service.",
}

const sections = [
	{
		title: "acceptance",
		body: "by using h.xyz you agree to these terms. if you disagree, don't use the service. it's that simple.",
	},
	{
		title: "service",
		body: "h.xyz provides a token swap aggregator and encrypted email service. we route swaps through third-party providers — we are not an exchange and do not custody funds. all transactions are executed on-chain or through the provider's infrastructure.",
	},
	{
		title: "no warranty",
		body: "h.xyz is provided as-is. we make no guarantees about uptime, swap execution, or email delivery. cryptocurrency is volatile and risky. you are responsible for your own transactions.",
	},
	{
		title: "your responsibility",
		body: "you are solely responsible for your wallet security, private keys, and transaction decisions. we cannot reverse transactions or recover lost funds. always verify addresses before sending.",
	},
	{
		title: "third-party providers",
		body: "swap providers (jupiter, cow protocol, debridge, houdini swap, uniswap) have their own terms and risks. h.xyz is not liable for their actions, downtime, or execution failures.",
	},
	{
		title: "prohibited use",
		body: "don't use h.xyz for anything illegal in your jurisdiction. don't try to attack, exploit, or abuse the service. don't impersonate others.",
	},
	{
		title: "modifications",
		body: "we may update these terms at any time. continued use after changes means you accept the new terms.",
	},
]

export default function TermsPage() {
	return (
		<>
			<Header />
			<main className="mx-auto max-w-2xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
				<h1 className="font-serif text-4xl italic text-white sm:text-5xl">terms</h1>
				<p className="mt-2 text-sm text-white/40">last updated january 2026</p>

				<div className="mt-10 flex flex-col gap-8">
					{sections.map((s) => (
						<section key={s.title}>
							<h2 className="text-[15px] font-medium text-white/80">{s.title}</h2>
							<p className="mt-2 text-[13px] leading-[1.8] text-white/35">{s.body}</p>
						</section>
					))}
				</div>

				<div className="mt-12 flex items-center gap-2 border-t border-white/[0.06] pt-6 text-[11px] text-white/15">
					<span className="h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
					questions? contact legal@h.xyz
				</div>
			</main>
			<Footer />
		</>
	)
}
