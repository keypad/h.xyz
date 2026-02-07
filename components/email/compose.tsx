"use client"

import { useState } from "react"
import { useEmail } from "@/components/email/context"
import { CloseIcon, LockIcon, SendIcon } from "@/components/email/icons"

export default function Compose() {
	const { composing, setComposing } = useEmail()
	const [to, setTo] = useState("")
	const [subject, setSubject] = useState("")
	const [body, setBody] = useState("")

	if (!composing) return null

	const close = () => {
		setComposing(false)
		setTo("")
		setSubject("")
		setBody("")
	}

	return (
		<div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
			<button
				type="button"
				className="fixed inset-0 bg-black/60 backdrop-blur-sm"
				onClick={close}
			/>
			<div className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1e1c1a] shadow-2xl">
				<div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
					<span className="text-[13px] font-medium text-white">new message</span>
					<button
						type="button"
						onClick={close}
						className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/50"
					>
						<CloseIcon />
					</button>
				</div>
				<div className="border-b border-white/[0.04]">
					<div className="flex items-center border-b border-white/[0.04] px-5 py-2.5">
						<span className="w-12 text-[12px] text-white/20">to</span>
						<input
							type="text"
							value={to}
							onChange={(e) => setTo(e.target.value)}
							className="flex-1 bg-transparent font-mono text-[13px] text-white/70 placeholder:text-white/15 focus:outline-none"
							placeholder="address@h.xyz"
						/>
					</div>
					<div className="flex items-center px-5 py-2.5">
						<span className="w-12 text-[12px] text-white/20">subject</span>
						<input
							type="text"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							className="flex-1 bg-transparent text-[13px] text-white/70 placeholder:text-white/15 focus:outline-none"
						/>
					</div>
				</div>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					rows={10}
					className="flex-1 resize-none bg-transparent px-5 py-4 text-[13px] leading-[1.8] text-white/50 placeholder:text-white/10 focus:outline-none"
					placeholder="write your message..."
				/>
				<div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
					<div className="flex items-center gap-1.5 text-[11px] text-white/15">
						<LockIcon className="text-white/15" />
						encrypted
					</div>
					<button
						type="button"
						onClick={close}
						className="flex items-center gap-2 rounded-xl bg-[#f996ee] px-5 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
					>
						<SendIcon />
						send
					</button>
				</div>
			</div>
		</div>
	)
}
