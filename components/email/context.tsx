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
	send: (to: string, subject: string, body: string) => void
	trash: (id: number) => void
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

	const send = (to: string, subject: string, body: string) => {
		const id = Math.max(...emails.map((e) => e.id)) + 1
		const now = new Date()
		const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase()
		const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
		setEmails((prev) => [
			{
				id,
				folder: "sent",
				from: "hi@h.xyz",
				to,
				subject,
				preview: body.slice(0, 80),
				time,
				date,
				unread: false,
				starred: false,
				encrypted: true,
				body,
			},
			...prev,
		])
	}

	const trash = (id: number) =>
		setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, folder: "trash" } : e)))

	const filtered = useMemo(
		() =>
			emails.filter((e) => {
				const match = folder === "starred" ? e.starred : e.folder === folder
				if (!match) return false
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
				send,
				trash,
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
