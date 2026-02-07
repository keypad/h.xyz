"use client"

import Link from "next/link"
import Ghost from "@/components/ghost"

const links = {
	products: [
		{ label: "swap", href: "/swap" },
		{ label: "email", href: "/email" },
		{ label: "docs", href: "/docs" },
	],
	social: [
		{ label: "github", href: "https://github.com/keypad", external: true },
		{ label: "twitter", href: "https://twitter.com/hdotxyz", external: true },
	],
	legal: [
		{ label: "privacy", href: "/privacy" },
		{ label: "terms", href: "/terms" },
	],
}

function Column({ title, items }: { title: string; items: typeof links.products }) {
	return (
		<div className="flex flex-col gap-2.5">
			<span className="mb-4 text-xs font-medium uppercase tracking-wider text-white/40">
				{title}
			</span>
			{items.map((item) =>
				"external" in item ? (
					<a
						key={item.label}
						href={item.href}
						target="_blank"
						rel="noopener noreferrer"
						referrerPolicy="no-referrer"
						className="text-sm text-white/50 transition-colors hover:text-white"
					>
						{item.label}
					</a>
				) : (
					<Link
						key={item.label}
						href={item.href}
						className="text-sm text-white/50 transition-colors hover:text-white"
					>
						{item.label}
					</Link>
				),
			)}
		</div>
	)
}

const marquee = Array(12).fill("h").join(" \u00b7 ")

export default function Footer() {
	return (
		<footer className="border-t border-white/5 text-white">
			<div className="flex flex-col justify-between gap-12 px-6 pt-16 pb-12 md:flex-row md:px-20">
				<div>
					<Ghost className="h-6 w-auto text-white" />
					<p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
						zero tracking. zero data. zero compromise.
					</p>
				</div>
				<div className="flex gap-10 md:gap-16">
					<Column title="products" items={links.products} />
					<Column title="social" items={links.social} />
					<Column title="legal" items={links.legal} />
				</div>
			</div>
			<div className="overflow-hidden">
				<div
					className="whitespace-nowrap font-serif text-[10rem] italic text-white/[0.03]"
					style={{ animation: "scroll 20s linear infinite" }}
				>
					{marquee} {marquee}
				</div>
			</div>
			<div className="flex items-end justify-between border-t border-white/5 px-6 py-6 md:px-20">
				<span className="text-xs text-white/30">2026 h.xyz</span>
				<button
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="text-xs text-white/30 transition-colors hover:text-white"
				>
					back to top
				</button>
			</div>
		</footer>
	)
}
