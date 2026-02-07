"use client"

import { createContext, type ReactNode, useContext, useState } from "react"
import { type Email, emails as initial } from "@/components/email/data"

type State = {
	folder: string
	selected: number | null
	composing: boolean
	search: string
	mobile: boolean
	emails: Email[]
	setFolder: (id: string) => void
	setSelected: (id: number | null) => void
	setComposing: (v: boolean) => void
	setSearch: (v: string) => void
	setMobile: (v: boolean) => void
	filtered: Email[]
}

const Context = createContext<State>(null!)

export function Provider({ children }: { children: ReactNode }) {
	const [folder, setFolder] = useState("inbox")
	const [selected, setSelected] = useState<number | null>(1)
	const [composing, setComposing] = useState(false)
	const [search, setSearch] = useState("")
	const [mobile, setMobile] = useState(false)

	const filtered = initial.filter((e) => {
		if (e.folder !== folder) return false
		if (!search) return true
		const q = search.toLowerCase()
		return (
			e.from.toLowerCase().includes(q) ||
			e.subject.toLowerCase().includes(q) ||
			e.preview.toLowerCase().includes(q)
		)
	})

	return (
		<Context.Provider
			value={{
				folder,
				selected,
				composing,
				search,
				mobile,
				emails: initial,
				setFolder,
				setSelected,
				setComposing,
				setSearch,
				setMobile,
				filtered,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export function useEmail() {
	return useContext(Context)
}
