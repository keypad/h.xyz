import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "email",
	description: "encrypted email with @h.xyz addresses. zero tracking. zero data.",
}

export default function EmailLayout({ children }: { children: React.ReactNode }) {
	return children
}
