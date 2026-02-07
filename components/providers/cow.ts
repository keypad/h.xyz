import { COW_TOKENS, WETH_BY_CHAIN } from "./tokens/cow"
import type { ProviderModule, SwapToken } from "./types"
import { toSmallest } from "./types"

const CHAINS: Record<number, string> = {
	1: "mainnet",
	100: "xdai",
	42161: "arbitrum_one",
	8453: "base",
}

const API = "https://api.cow.fi"

function weth(chainId: number): string {
	return WETH_BY_CHAIN[chainId] ?? WETH_BY_CHAIN[1]
}

function isNative(token: SwapToken): boolean {
	return token.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
}

export const cow: ProviderModule = {
	tokens: (chainId) => {
		const id = Number(chainId) || 1
		return COW_TOKENS.filter((t) => t.chainId === id)
	},

	quote: async ({ input, output, amount, sender }) => {
		const chainId = (input.chainId as number) || 1
		const chain = CHAINS[chainId]
		if (!chain) return null

		const sellAmount = toSmallest(amount, input.decimals)
		if (sellAmount === "0") return null

		const w = weth(chainId)
		const sellToken = isNative(input) ? w : input.address
		const buyToken = isNative(output) ? w : output.address

		const from = sender || "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
		const body: Record<string, any> = {
			sellToken,
			buyToken,
			sellAmountBeforeFee: sellAmount,
			kind: "sell",
			from,
			receiver: from,
			validFor: 1800,
		}

		const res = await fetch(`${API}/${chain}/api/v1/quote`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})

		if (!res.ok) return null
		const data = await res.json()

		const outputAmount = (Number(BigInt(data.quote.buyAmount)) / 10 ** output.decimals).toString()
		const inputNum = Number.parseFloat(amount)
		const outputNum = Number.parseFloat(outputAmount)

		return {
			provider: "cow",
			input,
			output,
			inputAmount: amount,
			outputAmount,
			rate: inputNum > 0 ? outputNum / inputNum : 0,
			route: "cow batch auction",
			fee: (Number(BigInt(data.quote.feeAmount)) / 10 ** input.decimals).toFixed(6),
			_raw: data,
		}
	},

	swap: async ({ quote, sender, signer }) => {
		const raw = quote._raw as Record<string, any> | undefined
		if (!raw || !signer) return { status: "error", message: "missing data" }

		const chainId = (quote.input.chainId as number) || 1
		const chain = CHAINS[chainId]
		if (!chain) return { status: "error", message: "unsupported chain" }

		const order = raw.quote
		const signature = await signer.signTypedData({
			domain: {
				name: "Gnosis Protocol",
				version: "v2",
				chainId,
				verifyingContract: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
			},
			types: {
				Order: [
					{ name: "sellToken", type: "address" },
					{ name: "buyToken", type: "address" },
					{ name: "receiver", type: "address" },
					{ name: "sellAmount", type: "uint256" },
					{ name: "buyAmount", type: "uint256" },
					{ name: "validTo", type: "uint32" },
					{ name: "appData", type: "bytes32" },
					{ name: "feeAmount", type: "uint256" },
					{ name: "kind", type: "string" },
					{ name: "partiallyFillable", type: "bool" },
					{ name: "sellTokenBalance", type: "string" },
					{ name: "buyTokenBalance", type: "string" },
				],
			},
			primaryType: "Order",
			message: order,
		})

		const res = await fetch(`${API}/${chain}/api/v1/orders`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...order,
				signature,
				signingScheme: "eip712",
				from: sender,
			}),
		})

		if (!res.ok) return { status: "error", message: "order submission failed" }
		const uid = await res.json()

		return {
			status: "success" as const,
			hash: uid,
			explorer: `https://explorer.cow.fi/orders/${uid}`,
		}
	},
}
