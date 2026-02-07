import { NextResponse } from "next/server"

const BASE = "https://dln.debridge.finance/v1.0"
const REFERRAL = process.env.DEBRIDGE_REFERRAL_CODE || ""

const STRIP = ["x-forwarded-for", "x-real-ip", "cf-connecting-ip", "x-vercel-forwarded-for"]

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)

	const params = new URLSearchParams()
	for (const [key, value] of searchParams.entries()) {
		params.set(key, value)
	}

	if (REFERRAL) params.set("referralCode", REFERRAL)

	const upstream = await fetch(`${BASE}/dln/order/create-tx?${params}`, {
		cache: "no-store",
	})

	const data = await upstream.json()

	const response = NextResponse.json(data, { status: upstream.status })
	response.headers.set("Cache-Control", "no-store")
	for (const h of STRIP) response.headers.delete(h)
	return response
}
