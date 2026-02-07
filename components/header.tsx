"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Ghost from "@/components/ghost"

const links = [
	{ label: "swap", href: "/swap", color: "#EC4612" },
	{ label: "email", href: "/email", color: "#f996ee" },
	{ label: "docs", href: "/docs", color: "#BCEC79" },
]

export default function Header() {
	const pathname = usePathname()
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handle = () => setScrolled(window.scrollY > 80)
		window.addEventListener("scroll", handle)
		return () => window.removeEventListener("scroll", handle)
	}, [])

	return (
		<header className="fixed top-0 right-0 left-0 z-50 px-4 md:px-6">
			<nav
				className={`mx-auto flex max-w-6xl items-center border-b border-white/5 py-4 transition-colors duration-500 md:py-5 ${
					scrolled ? "bg-[#1a1816]/80 backdrop-blur-xl" : ""
				}`}
			>
				<Link href="/" className="flex h-11 items-center">
					<Ghost className="h-5 w-auto text-white" />
				</Link>
				<div className="flex-1" />
				{links.map((link) => {
					const active = pathname?.startsWith(link.href)
					return (
						<Link
							key={link.label}
							href={link.href}
							className={`hidden items-center gap-2 px-4 py-2 text-sm transition-colors hover:text-white md:flex ${
								active ? "text-white" : "text-white/50"
							}`}
						>
							<span className="h-1.5 w-1.5 rounded-full" style={{ background: link.color }} />
							{link.label}
						</Link>
					)
				})}
				<Link
					href="/swap"
					className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-fg transition-opacity hover:opacity-90 md:ml-2 md:px-5"
				>
					launch app
				</Link>
			</nav>
		</header>
	)
}
