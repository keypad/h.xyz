"use client"

import { useEmail } from "@/components/email/context"
import { folders } from "@/components/email/data"
import { LockIcon } from "@/components/email/icons"

export default function Sidebar() {
	const { folder, setFolder, setSelected, emails, mobile, setMobile } = useEmail()

	const switchFolder = (id: string) => {
		setFolder(id)
		const first = emails.find((e) => e.folder === id)
		setSelected(first?.id ?? null)
		if (mobile) setMobile(false)
	}

	return (
		<aside className="flex h-full flex-col border-r border-white/[0.06] bg-[#1e1c1a]">
			<div className="px-5 pt-5 pb-4">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f996ee]/10">
						<span className="text-xs font-semibold text-[#f996ee]">h</span>
					</div>
					<div className="flex flex-col">
						<span className="text-[13px] font-medium text-white">you@h.xyz</span>
						<span className="text-[11px] text-white/20">encrypted</span>
					</div>
				</div>
			</div>
			<nav className="flex-1 px-3">
				{folders.map((f) => (
					<button
						key={f.id}
						type="button"
						onClick={() => switchFolder(f.id)}
						className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
							folder === f.id
								? "bg-white/[0.06] text-white"
								: "text-white/40 hover:bg-white/[0.03] hover:text-white/60"
						}`}
					>
						<svg
							aria-hidden="true"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d={f.icon} />
						</svg>
						<span className="flex-1 text-[13px]">{f.label}</span>
						{f.count && f.count > 0 && (
							<span className="rounded-full bg-[#f996ee]/15 px-2 py-0.5 text-[10px] font-medium text-[#f996ee]">
								{f.count}
							</span>
						)}
					</button>
				))}
			</nav>
			<div className="border-t border-white/[0.06] px-5 py-4">
				<div className="flex items-center gap-1.5 text-[11px] text-white/20">
					<LockIcon className="text-white/20" />
					end-to-end encrypted
				</div>
			</div>
		</aside>
	)
}
