"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Ghost from "@/components/ghost"
import { LockIcon } from "@/components/email/icons"

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

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
						<h1 className="font-serif text-3xl italic text-white">sign in</h1>
						<p className="mt-1.5 text-sm text-white/25">to your @h.xyz inbox</p>
					</div>
				</div>

				<form onSubmit={submit} className="flex flex-col gap-3">
					<div className="rounded-xl bg-white/[0.04] px-4 py-3">
						<label className="text-[11px] text-white/20">email</label>
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you"
								className="w-0 min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/15"
							/>
							<span className="text-[15px] text-white/20">@h.xyz</span>
						</div>
					</div>

					<div className="rounded-xl bg-white/[0.04] px-4 py-3">
						<label className="text-[11px] text-white/20">password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-0.5 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/15"
						/>
					</div>

					<button
						type="submit"
						className="mt-2 w-full rounded-xl bg-[#f996ee] py-3.5 text-sm font-medium text-[#1a1816] transition-opacity hover:opacity-90"
					>
						sign in
					</button>
				</form>

				<div className="mt-6 flex flex-col items-center gap-4">
					<Link href="/email/register" className="text-sm text-white/25 transition-colors hover:text-white/40">
						create account
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
