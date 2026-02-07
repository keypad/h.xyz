"use client"

import Compose from "@/components/email/compose"
import { Provider, useEmail } from "@/components/email/context"
import Detail from "@/components/email/detail"
import List from "@/components/email/list"
import Overlay from "@/components/email/overlay"
import { useShortcuts } from "@/components/email/shortcuts"
import Sidebar from "@/components/email/sidebar"
import Toolbar from "@/components/email/toolbar"

function Layout() {
	const { selected } = useEmail()
	useShortcuts()

	return (
		<div className="flex h-screen overflow-hidden bg-[#1e1c1a]">
			<div className="hidden w-56 shrink-0 md:block">
				<Sidebar />
			</div>
			<Overlay />
			<div className="flex min-w-0 flex-1 flex-col">
				<Toolbar />
				<div className="relative flex min-h-0 flex-1">
					<div className="w-full flex-shrink-0 border-r border-white/[0.06] md:block md:w-80">
						<div className="flex h-full flex-col">
							<List />
						</div>
					</div>
					<div className="hidden min-w-0 flex-1 md:flex">
						<Detail />
					</div>
					{selected && (
						<div className="absolute inset-0 z-10 bg-[#1e1c1a] md:hidden animate-[slideright_200ms_ease-out]">
							<Detail />
						</div>
					)}
				</div>
			</div>
			<Compose />
		</div>
	)
}

export default function Client() {
	return (
		<Provider>
			<Layout />
		</Provider>
	)
}
