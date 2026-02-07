"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LockIcon } from "@/components/email/icons"
import Ghost from "@/components/ghost"

export default function RegisterPage() {
	const router = useRouter()
	const [handle, setHandle] = useState("")
	const [password, setPassword] = useState("")
	const [confirm, setConfirm] = useState("")
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => ref.current?.focus(), [])

	const valid = handle && password && password === confirm

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		router.push("/email")
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#1a1816] px-4">
			<div className="w-full max-w-sm">
				<div className="mb-10 flex flex-col items-center gap-4">
					<Ghost className="h-8 w-auto text-white/20" />
					<div className="text-center">
						<h1 className="font-serif text-3xl italic text-white">create account</h1>
						<p className="mt-1.5 text-sm text-white/25">claim your @h.xyz address</p>
					</div>
				</div>

				<form onSubmit={submit} className="flex flex-col gap-3">
					<label className="rounded-xl bg-white/[0.04] px-4 py-3">
						<span className="text-[11px] text-white/20">address</span>
						<div className="flex items-center gap-2">
							<input
								ref={ref}
								type="text"
								value={handle}
								onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
								placeholder="yourname"
								className="w-0 min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/15"
							/>
							<span className="text-[15px] text-white/20">@h.xyz</span>
						</div>
					</label>

					<label className="rounded-xl bg-white/[0.04] px-4 py-3">
						<span className="text-[11px] text-white/20">password</span>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-0.5 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/15"
						/>
					</label>

					<label className="rounded-xl bg-white/[0.04] px-4 py-3">
						<span className="text-[11px] text-white/20">confirm password</span>
						<input
							type="password"
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
							className="mt-0.5 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/15"
						/>
					</label>

					<button
						type="submit"
						disabled={!valid}
						className="mt-2 w-full rounded-xl bg-[#f996ee] py-3.5 text-sm font-medium text-[#1a1816] transition-opacity hover:opacity-90 disabled:opacity-30"
					>
						create account
					</button>
				</form>

				<div className="mt-6 flex flex-col items-center gap-4">
					<Link
						href="/email/login"
						className="text-sm text-white/25 transition-colors hover:text-white/40"
					>
						already have an account
					</Link>
					<div className="flex items-center gap-1.5 text-[11px] text-white/15">
						<LockIcon className="text-white/15" />
						end-to-end encrypted
					</div>
				</div>
			</div>
		</div>
	)
}
