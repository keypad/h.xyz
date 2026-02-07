"use client"

import Compose from "@/components/email/compose"
import { Provider } from "@/components/email/context"
import Detail from "@/components/email/detail"
import List from "@/components/email/list"
import Overlay from "@/components/email/overlay"
import Sidebar from "@/components/email/sidebar"
import Toolbar from "@/components/email/toolbar"

export default function Client() {
	return (
		<Provider>
			<div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1e1c1a]">
				<div className="hidden w-56 shrink-0 md:block">
					<Sidebar />
				</div>
				<Overlay />
				<div className="flex min-w-0 flex-1 flex-col">
					<Toolbar />
					<div className="flex min-h-0 flex-1">
						<div className="w-full flex-shrink-0 border-r border-white/[0.06] md:w-80">
							<div className="flex h-full flex-col">
								<List />
							</div>
						</div>
						<div className="hidden min-w-0 flex-1 md:flex">
							<Detail />
						</div>
					</div>
				</div>
			</div>
			<Compose />
		</Provider>
	)
}
