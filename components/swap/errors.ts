export function classify(error: unknown): string {
	if (error instanceof DOMException && error.name === "AbortError") return "slow response"
	if (error instanceof TypeError && error.message.includes("fetch")) return "provider unavailable"
	const msg = String(error instanceof Error ? error.message : error).toLowerCase()
	if (msg.includes("403") || msg.includes("429") || msg.includes("rate")) return "rate limited"
	if (msg.includes("network") || msg.includes("failed to fetch")) return "provider unavailable"
	if (msg.includes("timeout") || msg.includes("abort")) return "slow response"
	return "quote unavailable"
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
