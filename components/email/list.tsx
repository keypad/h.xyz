"use client"

import { useEffect, useRef } from "react"
import { useEmail } from "@/components/email/context"
import { LABEL_COLORS } from "@/components/email/data"
import Empty from "@/components/email/empty"
import { ClipIcon, LockIcon } from "@/components/email/icons"

export default function List() {
	const { filtered, selected, setSelected, markRead, folder, search } = useEmail()
	const refs = useRef<Map<number, HTMLButtonElement>>(new Map())

	useEffect(() => {
		if (selected) {
			const el = refs.current.get(selected)
			el?.scrollIntoView({ block: "nearest", behavior: "smooth" })
		}
	}, [selected])

	if (filtered.length === 0) return <Empty folder={folder} searching={!!search} />

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
								{folder === "sent" || folder === "drafts" ? (
									<><span className="text-white/20">to </span>{email.to}</>
								) : email.from}
							</span>
						</div>
						<div className="flex shrink-0 items-center gap-2">
							{email.starred && (
								<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="#f996ee" className="text-[#f996ee]/40">
									<path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
								</svg>
							)}
							{email.attachment && <ClipIcon className="text-white/15" />}
							{email.encrypted && <LockIcon className="text-white/10" />}
							<span className="text-[11px] text-white/15">{email.time}</span>
						</div>
					</div>
					<div className="mt-0.5 flex items-center gap-1.5 overflow-hidden">
						<p
							className={`truncate text-[13px] ${
								email.unread ? "font-medium text-white/70" : "text-white/30"
							}`}
						>
							{email.subject}
						</p>
						{email.labels?.map((l) => (
							<span
								key={l}
								className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium"
								style={{
									background: `${LABEL_COLORS[l] ?? "#666"}20`,
									color: LABEL_COLORS[l] ?? "#666",
								}}
							>
								{l}
							</span>
						))}
					</div>
					<p className="mt-1 line-clamp-1 text-[12px] leading-relaxed text-white/15">
						{email.preview}
					</p>
				</button>
			))}
		</div>
	)
}
