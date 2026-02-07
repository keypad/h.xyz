import { NextResponse } from "next/server"

const BASE = "https://api.jup.ag/swap/v1"
const KEY = process.env.JUPITER_API_KEY || ""

const STRIP = ["x-forwarded-for", "x-real-ip", "cf-connecting-ip", "x-vercel-forwarded-for"]

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)

	const params = new URLSearchParams()
	for (const [key, value] of searchParams.entries()) {
		params.set(key, value)
	}

	const headers: Record<string, string> = {}
	if (KEY) headers["x-api-key"] = KEY

	const upstream = await fetch(`${BASE}/quote?${params}`, {
		headers,
		cache: "no-store",
	})

	const data = await upstream.json()

	const response = NextResponse.json(data, { status: upstream.status })
	response.headers.set("Cache-Control", "no-store")
	for (const h of STRIP) response.headers.delete(h)
	return response
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

	const data = await upstream.json()

	const response = NextResponse.json(data, { status: upstream.status })
	response.headers.set("Cache-Control", "no-store")
	for (const h of STRIP) response.headers.delete(h)
	return response
}
