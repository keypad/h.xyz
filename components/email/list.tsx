"use client"

import { useEffect, useRef } from "react"
import { useEmail } from "@/components/email/context"
import Empty from "@/components/email/empty"
import { LockIcon } from "@/components/email/icons"

export default function List() {
	const { filtered, selected, setSelected, markRead, folder } = useEmail()
	const refs = useRef<Map<number, HTMLButtonElement>>(new Map())

	useEffect(() => {
		if (selected) {
			const el = refs.current.get(selected)
			el?.scrollIntoView({ block: "nearest", behavior: "smooth" })
		}
	}, [selected])

	if (filtered.length === 0) return <Empty folder={folder} />

	return (
		<div className="flex-1 divide-y divide-white/[0.03] overflow-y-auto">
			{filtered.map((email) => (
				<button
					key={email.id}
					ref={(el) => {
						if (el) refs.current.set(email.id, el)
					}}
					type="button"
					onClick={() => {
						setSelected(email.id)
						if (email.unread) markRead(email.id)
					}}
					className={`group w-full px-5 py-4 text-left transition-colors duration-150 ${
						selected === email.id ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
					}`}
				>
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2 overflow-hidden">
							{email.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f996ee]" />}
							<span
								className={`truncate text-[13px] ${
									email.unread ? "font-semibold text-white" : "text-white/40"
								}`}
							>
								{folder === "sent" || folder === "drafts" ? `to ${email.to}` : email.from}
							</span>
						</div>
						<div className="flex shrink-0 items-center gap-2">
							{email.encrypted && <LockIcon className="text-white/10" />}
							<span className="text-[11px] text-white/15">{email.time}</span>
						</div>
					</div>
					<p
						className={`mt-0.5 truncate text-[13px] ${
							email.unread ? "font-medium text-white/70" : "text-white/30"
						}`}
					>
						{email.subject}
					</p>
					<p className="mt-1 line-clamp-1 text-[12px] leading-relaxed text-white/15">
						{email.preview}
					</p>
				</button>
			))}
		</div>
	)
}
