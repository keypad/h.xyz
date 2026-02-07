"use client"

import { useState } from "react"
import { folders, messages } from "@/components/messages"

export default function Inbox() {
	const [folder, setFolder] = useState("inbox")
	const filtered = messages.filter((m) => m.folder === folder)
	const [selected, setSelected] = useState(filtered[0]?.id ?? 1)
	const active = filtered.find((m) => m.id === selected) ?? filtered[0]

	const switchFolder = (id: string) => {
		setFolder(id)
		const first = messages.find((m) => m.folder === id)
		if (first) setSelected(first.id)
	}

	return (
		<div className="overflow-clip rounded-2xl border border-white/[0.06] bg-[#1e1c1a]">
			<div className="grid border-b border-white/5 md:grid-cols-[340px_1fr]">
				<div className="flex items-center gap-2 border-r border-white/5 px-4 py-3">
					<div className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-1.5">
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-[14px] w-[14px] shrink-0 text-white/50"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M5.33333 4C3.49238 4 2 5.53502 2 7.42857V16.5714C2 18.465 3.49238 20 5.33333 20H18.6667C20.5076 20 22 18.465 22 16.5714V7.42857C22 5.53502 20.5076 4 18.6667 4H5.33333ZM7.62469 8.21913C7.19343 7.87412 6.56414 7.94404 6.21913 8.37531C5.87412 8.80657 5.94404 9.43586 6.37531 9.78087L11.3753 13.7809L12 14.2806L12.6247 13.7809L17.6247 9.78087C18.056 9.43586 18.1259 8.80657 17.7809 8.37531C17.4359 7.94404 16.8066 7.87412 16.3753 8.21913L12 11.7194L7.62469 8.21913Z"
							/>
						</svg>
						<span className="text-[12px] font-medium text-white">xyz</span>
					</div>
					<div className="flex flex-1 items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-1.5">
						<svg
							aria-hidden="true"
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							className="text-white/15"
						>
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<span className="text-[12px] text-white/15">search</span>
					</div>
				</div>
				<div className="hidden items-center justify-end px-5 md:flex">
					<button
						type="button"
						className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f996ee] text-white transition-opacity hover:opacity-90"
					>
						<svg
							aria-hidden="true"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
						>
							<path d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</div>
			</div>
			<div className="grid h-[440px] md:grid-cols-[340px_1fr]">
				<div className="flex min-h-0 flex-col border-r border-white/5">
					<div className="flex gap-1 border-b border-white/5 px-4 py-2">
						{folders.map((f) => (
							<button
								key={f.id}
								type="button"
								onClick={() => switchFolder(f.id)}
								className={`rounded-md p-2 transition-colors ${
									folder === f.id
										? "bg-white/[0.06] text-white/50"
										: "text-white/20 hover:bg-white/[0.03] hover:text-white/40"
								}`}
							>
								<svg
									aria-hidden="true"
									width="15"
									height="15"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d={f.icon} />
								</svg>
							</button>
						))}
					</div>
					<div className="flex-1 divide-y divide-white/[0.03] overflow-y-auto">
						{filtered.map((msg) => (
							<button
								key={msg.id}
								type="button"
								onClick={() => setSelected(msg.id)}
								className={`w-full px-5 py-4 text-left transition-colors ${
									selected === msg.id ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
								}`}
							>
								<div className="flex items-center justify-between">
									<span
										className={`text-[13px] ${msg.unread ? "font-semibold text-white" : "text-white/40"}`}
									>
										{msg.from}
									</span>
									<span className="text-[11px] text-white/15">{msg.time}</span>
								</div>
								<p
									className={`mt-0.5 text-[13px] ${msg.unread ? "font-medium text-white/70" : "text-white/30"}`}
								>
									{msg.subject}
								</p>
								<p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-white/15">
									{msg.preview}
								</p>
							</button>
						))}
					</div>
				</div>

				<div className="hidden min-h-0 flex-col md:flex">
					{active ? (
						<>
							<div className="border-b border-white/5 px-6 py-4">
								<div className="flex items-center gap-2">
									<span className="text-[13px] font-medium text-white">{active.from}</span>
									<span className="text-[11px] text-white/15">{active.time}</span>
								</div>
								<span className="text-[12px] text-white/40">{active.subject}</span>
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
							<div className="flex items-center justify-between border-t border-white/5 px-6 py-3">
								<div className="flex gap-2">
									<button
										type="button"
										className="rounded-lg border border-white/[0.06] px-4 py-2 text-[12px] text-white/25 transition-colors hover:border-white/10 hover:text-white/40"
									>
										reply
									</button>
									<button
										type="button"
										className="rounded-lg border border-white/[0.06] px-4 py-2 text-[12px] text-white/25 transition-colors hover:border-white/10 hover:text-white/40"
									>
										forward
									</button>
								</div>
								<div className="flex items-center gap-1.5 text-[11px] text-white/10">
									<span className="h-1.5 w-1.5 rounded-full bg-[#BCEC79]" />
									encrypted
								</div>
							</div>
						</>
					) : (
						<div className="flex flex-1 items-center justify-center text-[13px] text-white/15">
							empty
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
