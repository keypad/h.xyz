"use client"

import { useEmail } from "@/components/email/context"
import { ComposeIcon, MenuIcon, SearchIcon } from "@/components/email/icons"

export default function Toolbar() {
	const { search, setSearch, setComposing, setMobile } = useEmail()

	return (
		<div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
			<button
				type="button"
				aria-label="menu"
				onClick={() => setMobile(true)}
				className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/60 md:hidden"
			>
				<MenuIcon />
			</button>
			<div className="flex flex-1 items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
				<SearchIcon className="shrink-0 text-white/20" />
				<input
					data-search
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => {
					if (e.key === "Escape") {
						setSearch("")
						;(e.target as HTMLInputElement).blur()
					}
				}}
					placeholder="search"
					className="w-full bg-transparent text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none"
				/>
				{search && (
					<button
						type="button"
						onClick={() => setSearch("")}
						className="shrink-0 text-white/20 transition-colors hover:text-white/40"
					>
						<svg
							aria-hidden="true"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				)}
			</div>
			<button
				type="button"
				aria-label="compose"
				onClick={() => setComposing(true)}
				className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f996ee] text-white transition-opacity hover:opacity-90"
			>
				<ComposeIcon />
			</button>
		</div>
	)
}
