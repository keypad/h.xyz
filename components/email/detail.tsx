"use client"

import { useEmail } from "@/components/email/context"
import { ArrowLeftIcon } from "@/components/email/icons"

export default function Detail() {
	const { selected, emails, setSelected, setComposing } = useEmail()
	const active = emails.find((e) => e.id === selected)

	if (!active) {
		return (
			<div className="flex flex-1 items-center justify-center text-[13px] text-white/15">
				select a message
			</div>
		)
	}

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="border-b border-white/[0.06] px-6 py-4">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => setSelected(null)}
						className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/50 md:hidden"
					>
						<ArrowLeftIcon />
					</button>
					<div className="flex-1 overflow-hidden">
						<div className="flex items-center gap-2">
							<span className="truncate text-[13px] font-medium text-white">{active.from}</span>
							<span className="shrink-0 text-[11px] text-white/15">{active.date}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<span className="truncate font-mono text-[11px] text-white/25">to {active.to}</span>
						</div>
					</div>
					{active.starred && (
						<svg
							aria-hidden="true"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="#f996ee"
							className="shrink-0 text-[#f996ee]"
						>
							<path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
						</svg>
					)}
				</div>
				<h3 className="mt-2 text-[15px] font-medium text-white/80">{active.subject}</h3>
			</div>
			<div className="flex-1 overflow-y-auto px-6 py-6">
				<div className="whitespace-pre-line text-[13px] leading-[1.8] text-white/40">
					{active.body}
				</div>
				{active.quote && (
					<div className="my-5 border-l-2 border-white/10 pl-4 text-[13px] italic leading-[1.8] text-white/25">
						{active.quote}
					</div>
				)}
				{active.after && (
					<div className="whitespace-pre-line text-[13px] leading-[1.8] text-white/40">
						{active.after}
					</div>
				)}
			</div>
			<div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-3">
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setComposing(true)}
						className="rounded-xl border border-white/[0.06] px-4 py-2 text-[12px] text-white/25 transition-colors hover:border-white/10 hover:text-white/40"
					>
						reply
					</button>
					<button
						type="button"
						className="rounded-xl border border-white/[0.06] px-4 py-2 text-[12px] text-white/25 transition-colors hover:border-white/10 hover:text-white/40"
					>
						forward
					</button>
				</div>
				{active.encrypted && (
					<div className="flex items-center gap-1.5 text-[11px] text-white/15">
						<span className="h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
						encrypted
					</div>
				)}
			</div>
		</div>
	)
}
