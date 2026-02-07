import { type NextRequest, NextResponse } from "next/server"

const BASE = "https://api-partner.houdiniswap.com"
const KEY = process.env.HOUDINI_API_KEY || ""

const STRIP = ["x-forwarded-for", "x-real-ip", "cf-connecting-ip", "x-vercel-forwarded-for"]

function headers() {
	const h: Record<string, string> = {}
	if (KEY) h.Authorization = KEY
	return h
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const action = searchParams.get("action")

	let endpoint = ""
	const params = new URLSearchParams()

	if (action === "quote") {
		endpoint = "/quote"
		params.set("amount", searchParams.get("amount") || "")
		params.set("from", searchParams.get("from") || "")
		params.set("to", searchParams.get("to") || "")
		params.set("anonymous", searchParams.get("anonymous") || "true")
	} else if (action === "tokens") {
		endpoint = "/tokens"
	} else if (action === "status") {
		endpoint = "/status"
		params.set("id", searchParams.get("id") || "")
	} else {
		return NextResponse.json({ error: "invalid action" }, { status: 400 })
	}

	try {
		const qs = params.toString()
		const upstream = await fetch(`${BASE}${endpoint}${qs ? `?${qs}` : ""}`, {
			headers: headers(),
			cache: "no-store",
		})

		if (!upstream.headers.get("content-type")?.includes("json")) {
			return NextResponse.json({ error: "upstream" }, { status: upstream.status || 502 })
		}

		const data = await upstream.json()
		const response = NextResponse.json(data, { status: upstream.status })
		response.headers.set("Cache-Control", "no-store")
		for (const h of STRIP) response.headers.delete(h)
		return response
	} catch {
		return NextResponse.json({ error: "upstream failed" }, { status: 502 })
	}
}

export async function POST(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const action = searchParams.get("action")

	if (action !== "exchange") {
		return NextResponse.json({ error: "invalid action" }, { status: 400 })
	}

	try {
		const body = await req.json()

		const upstream = await fetch(`${BASE}/exchange`, {
			method: "POST",
			headers: { ...headers(), "Content-Type": "application/json" },
			body: JSON.stringify({
				amount: Number(body.amount),
				from: body.from,
				to: body.to,
				addressTo: body.addressTo,
				anonymous: body.anonymous ?? true,
				ip: "0.0.0.0",
				userAgent: "Mozilla/5.0",
				timezone: "UTC",
			}),
			cache: "no-store",
		})

		if (!upstream.headers.get("content-type")?.includes("json")) {
			return NextResponse.json({ error: "upstream" }, { status: upstream.status || 502 })
		}

		const data = await upstream.json()
		const response = NextResponse.json(data, { status: upstream.status })
		response.headers.set("Cache-Control", "no-store")
		for (const h of STRIP) response.headers.delete(h)
		return response
	} catch {
		return NextResponse.json({ error: "upstream failed" }, { status: 502 })
	}
}
