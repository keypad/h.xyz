"use client"

import { createContext, type ReactNode, useContext, useMemo, useState } from "react"
import { type Email, emails as initial } from "@/components/email/data"

type State = {
	folder: string
	selected: number | null
	composing: boolean
	search: string
	mobile: boolean
	emails: Email[]
	markRead: (id: number) => void
	toggleStar: (id: number) => void
	setFolder: (id: string) => void
	setSelected: (id: number | null) => void
	setComposing: (v: boolean) => void
	setSearch: (v: string) => void
	setMobile: (v: boolean) => void
	filtered: Email[]
	navigate: (direction: "up" | "down") => void
}

const Context = createContext<State>(null!)

export function Provider({ children }: { children: ReactNode }) {
	const [folder, setFolder] = useState("inbox")
	const [selected, setSelected] = useState<number | null>(null)
	const [composing, setComposing] = useState(false)
	const [search, setSearch] = useState("")
	const [mobile, setMobile] = useState(false)
	const [emails, setEmails] = useState(initial)

	const markRead = (id: number) =>
		setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, unread: false } : e)))

	const toggleStar = (id: number) =>
		setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)))

	const filtered = useMemo(
		() =>
			emails.filter((e) => {
				if (e.folder !== folder) return false
				if (!search) return true
				const q = search.toLowerCase()
				return (
					e.from.toLowerCase().includes(q) ||
					e.subject.toLowerCase().includes(q) ||
					e.preview.toLowerCase().includes(q)
				)
			}),
		[emails, folder, search],
	)

	const navigate = (direction: "up" | "down") => {
		if (filtered.length === 0) return
		const idx = filtered.findIndex((e) => e.id === selected)
		if (direction === "down") {
			const next = idx < filtered.length - 1 ? idx + 1 : 0
			setSelected(filtered[next].id)
		} else {
			const prev = idx > 0 ? idx - 1 : filtered.length - 1
			setSelected(filtered[prev].id)
		}
	}

	return (
		<Context.Provider
			value={{
				folder,
				selected,
				composing,
				search,
				mobile,
				emails,
				markRead,
				toggleStar,
				setFolder,
				setSelected,
				setComposing,
				setSearch,
				setMobile,
				filtered,
				navigate,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export function useEmail() {
	return useContext(Context)
}
