import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "email",
	description: "claim your @h.xyz email. encrypted by default. zero logging. zero tracking.",
	openGraph: {
		title: "email | h.xyz",
		description: "claim your @h.xyz email. encrypted by default. zero logging. zero tracking.",
		images: [{ url: "/email/opengraph-image", width: 1200, height: 630 }],
	},
}

export default function EmailLayout({ children }: { children: React.ReactNode }) {
	return children
}
