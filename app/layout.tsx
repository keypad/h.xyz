import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"

const geist = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const mono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

const serif = Instrument_Serif({
	variable: "--font-instrument-serif",
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
})

export const metadata: Metadata = {
	title: { default: "h.xyz", template: "%s | h.xyz" },
	description: "swap tokens. claim your email. zero tracking.",
	metadataBase: new URL("https://h.xyz"),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://h.xyz",
		siteName: "h.xyz",
		title: "h.xyz",
		description: "swap tokens. claim your email. zero tracking.",
		images: [{ url: "/og.png", width: 1200, height: 630, alt: "h.xyz" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "h.xyz",
		description: "swap tokens. claim your email. zero tracking.",
		images: ["/og.png"],
	},
	robots: { index: true, follow: true },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geist.variable} ${mono.variable} ${serif.variable} font-sans`}>
				{children}
			</body>
		</html>
	)
}
