"use client"

import { useEmail } from "@/components/email/context"
import Sidebar from "@/components/email/sidebar"

export default function Overlay() {
	const { mobile, setMobile } = useEmail()

	if (!mobile) return null

	return (
		<div className="fixed inset-0 z-40 md:hidden">
			<button
				type="button"
				className="fixed inset-0 bg-black/60 backdrop-blur-sm"
				onClick={() => setMobile(false)}
			/>
			<div className="relative h-full w-56">
				<Sidebar />
			</div>
		</div>
	)
}
