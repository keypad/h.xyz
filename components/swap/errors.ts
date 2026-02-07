export function isTransient(error: unknown): boolean {
	if (error instanceof DOMException && error.name === "AbortError") return true
	if (error instanceof TypeError && error.message.includes("fetch")) return true
	const msg = String(error instanceof Error ? error.message : error).toLowerCase()
	return (
		msg.includes("429") ||
		msg.includes("rate") ||
		msg.includes("timeout") ||
		msg.includes("network")
	)
}

export function classify(error: unknown): string {
	const msg = String(error instanceof Error ? error.message : error).toLowerCase()
	if (msg.includes("401") || msg.includes("unauthorized")) return "unauthorized"
	if (msg.includes("403")) return "unavailable"
	if (msg.includes("429") || msg.includes("rate")) return "rate limited"
	if (msg.includes("insufficient") || msg.includes("balance")) return "insufficient balance"
	if (msg.includes("slippage")) return "slippage exceeded"
	if (msg.includes("cross-chain")) return "cross-chain only"
	return "no route"
}

export function withTimeout<T>(promise: Promise<T>, ms: number, signal: AbortSignal): Promise<T> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(new DOMException("timeout", "AbortError")), ms)
		signal.addEventListener("abort", () => {
			clearTimeout(timer)
			reject(new DOMException("cancelled", "AbortError"))
		})
		promise
			.then((v) => {
				clearTimeout(timer)
				resolve(v)
			})
			.catch((e) => {
				clearTimeout(timer)
				reject(e)
			})
	})
}

export async function withRetry<T>(
	fn: (signal: AbortSignal) => Promise<T>,
	signal: AbortSignal,
	retries = 2,
): Promise<T> {
	let last: unknown
	for (let i = 0; i <= retries; i++) {
		if (signal.aborted) throw new DOMException("cancelled", "AbortError")
		try {
			return await fn(signal)
		} catch (e) {
			last = e
			if (!isTransient(e) || i === retries) throw e
			await new Promise((r) => setTimeout(r, (i + 1) * 1000))
		}
	}
	throw last
}
