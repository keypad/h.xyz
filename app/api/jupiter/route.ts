import { NextResponse } from "next/server"

const BASE = "https://api.jup.ag/swap/v1"
const TOKENS_URL = "https://lite-api.jup.ag/tokens/v2/mints/tradable"
const KEY = process.env.JUPITER_API_KEY || ""

const STRIP = ["x-forwarded-for", "x-real-ip", "cf-connecting-ip", "x-vercel-forwarded-for"]

function strip(response: NextResponse) {
	response.headers.set("Cache-Control", "no-store")
	for (const h of STRIP) response.headers.delete(h)
	return response
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const action = searchParams.get("action")

	if (action === "tokens") {
		const upstream = await fetch(TOKENS_URL, { cache: "no-store" })
		if (!upstream.ok || !upstream.headers.get("content-type")?.includes("json")) {
			return strip(NextResponse.json([], { status: upstream.status || 502 }))
		}
		const data = await upstream.json()
		return strip(NextResponse.json(data.slice(0, 100)))
	}

	const params = new URLSearchParams()
	for (const [key, value] of searchParams.entries()) {
		if (key !== "action") params.set(key, value)
	}

	const headers: Record<string, string> = {}
	if (KEY) headers["x-api-key"] = KEY

	const upstream = await fetch(`${BASE}/quote?${params}`, {
		headers,
		cache: "no-store",
	})

	if (!upstream.ok || !upstream.headers.get("content-type")?.includes("json")) {
		return strip(NextResponse.json({ error: "upstream" }, { status: upstream.status || 502 }))
	}

	const data = await upstream.json()
	return strip(NextResponse.json(data, { status: upstream.status }))
}

export async function POST(req: Request) {
	const body = await req.json()

	const headers: Record<string, string> = { "Content-Type": "application/json" }
	if (KEY) headers["x-api-key"] = KEY

	const upstream = await fetch(`${BASE}/swap`, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
		cache: "no-store",
	})

	if (!upstream.ok || !upstream.headers.get("content-type")?.includes("json")) {
		return strip(NextResponse.json({ error: "upstream" }, { status: upstream.status || 502 }))
	}

	const data = await upstream.json()
	return strip(NextResponse.json(data, { status: upstream.status }))
}
