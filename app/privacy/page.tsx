import type { Metadata } from "next"
import Footer from "@/components/footer"
import Header from "@/components/header"

export const metadata: Metadata = {
	title: "privacy",
	description: "h.xyz privacy policy. zero logging. zero tracking. zero compromise.",
}

const sections = [
	{
		title: "we collect nothing",
		body: "h.xyz does not collect, store, or process any personal data. no analytics. no cookies. no fingerprinting. no ip logging. we don't know who you are and we want to keep it that way.",
	},
	{
		title: "swap privacy",
		body: "swap transactions are executed directly through third-party providers (jupiter, cow protocol, debridge, houdini swap, uniswap). h.xyz proxies api requests to protect your identity — we strip identifying headers and never log request data. your wallet address exists only in your browser's memory.",
	},
	{
		title: "email privacy",
		body: "emails sent through h.xyz are encrypted end-to-end. we cannot read your messages. encryption keys are generated and stored client-side. the mail server stores encrypted blobs — without your key, the data is meaningless.",
	},
	{
		title: "no third parties",
		body: "we do not use google analytics, mixpanel, segment, hotjar, or any tracking service. we do not embed social media pixels. we do not share data with anyone because we have no data to share.",
	},
	{
		title: "open infrastructure",
		body: "our api proxies exist solely to hide api keys from the browser. they add no tracking, no logging, and no cookies. every proxied request is stateless and immediately forgotten.",
	},
	{
		title: "your rights",
		body: "since we collect nothing, there is nothing to delete, export, or correct. you have full control because we have zero control.",
	},
]

export default function PrivacyPage() {
	return (
		<>
			<Header />
			<main className="mx-auto max-w-2xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
				<h1 className="font-serif text-4xl italic text-white sm:text-5xl">privacy</h1>
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
					questions? contact privacy@h.xyz
				</div>
			</main>
			<Footer />
		</>
	)
}
