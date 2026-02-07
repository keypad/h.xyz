import { NextResponse } from "next/server"

const BASE = "https://api-partner.houdiniswap.com"
const KEY = process.env.HOUDINI_API_KEY || ""

const STRIP = ["x-forwarded-for", "x-real-ip", "cf-connecting-ip", "x-vercel-forwarded-for"]

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const action = searchParams.get("action")

	let endpoint = ""
	const params = new URLSearchParams()

	if (action === "quote") {
		endpoint = "/quote"
		params.set("amount", searchParams.get("amount") || "")
		params.set("from", searchParams.get("from") || "")
		params.set("to", searchParams.get("to") || "")
		params.set("anonymous", "true")
	} else if (action === "exchange") {
		endpoint = "/exchange"
		params.set("amount", searchParams.get("amount") || "")
		params.set("from", searchParams.get("from") || "")
		params.set("to", searchParams.get("to") || "")
		params.set("addressTo", searchParams.get("address") || "")
		params.set("anonymous", "true")
	} else if (action === "tokens") {
		endpoint = "/tokens"
	} else {
		return NextResponse.json({ error: "invalid action" }, { status: 400 })
	}

	const headers: Record<string, string> = {}
	if (KEY) headers.Authorization = `Basic ${Buffer.from(KEY).toString("base64")}`

	const upstream = await fetch(`${BASE}${endpoint}?${params}`, {
		headers,
		cache: "no-store",
	})

	const data = await upstream.json()

	const response = NextResponse.json(data, { status: upstream.status })
	response.headers.set("Cache-Control", "no-store")
	for (const h of STRIP) response.headers.delete(h)
	return response
}
