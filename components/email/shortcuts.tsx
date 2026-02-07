"use client"

import { useEffect } from "react"
import { useEmail } from "@/components/email/context"

export function useShortcuts() {
	const {
		selected, setSelected, setComposing, composing, navigate, filtered, mobile, toggleStar, trash, reply, forward,
	} = useEmail()

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement).tagName
			if (tag === "INPUT" || tag === "TEXTAREA") return
			if (composing) {
				if (e.key === "Escape") setComposing(false)
				return
			}

			switch (e.key) {
				case "j":
					navigate("down")
					break
				case "k":
					navigate("up")
					break
				case "Enter":
					if (selected && filtered.length > 0) {
						setSelected(selected)
					}
					break
				case "Escape":
					if (mobile || selected) setSelected(null)
					break
				case "/":
					e.preventDefault()
					document.querySelector<HTMLInputElement>("[data-search]")?.focus()
					break
				case "c":
					e.preventDefault()
					setComposing(true)
					break
				case "r":
					if (selected) {
						e.preventDefault()
						reply(selected)
					}
					break
				case "s":
					if (selected) toggleStar(selected)
					break
				case "f":
					if (selected) {
						e.preventDefault()
						forward(selected)
					}
					break
				case "d":
					if (selected) trash(selected)
					break
			}
		}

		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	}, [selected, composing, navigate, setSelected, setComposing, filtered, mobile, toggleStar, trash, reply, forward])
}
