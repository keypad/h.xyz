"use client"

import { useEffect, type RefObject } from "react"

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function useTrap(ref: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const el = ref.current
		if (!el) return

		const handler = (e: KeyboardEvent) => {
			if (e.key !== "Tab") return
			const nodes = el.querySelectorAll<HTMLElement>(FOCUSABLE)
			if (nodes.length === 0) return

			const first = nodes[0]
			const last = nodes[nodes.length - 1]

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault()
				last.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}

		document.addEventListener("keydown", handler)
		return () => document.removeEventListener("keydown", handler)
	}, [ref])
}
