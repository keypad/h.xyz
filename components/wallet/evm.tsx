"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { createConfig, http, WagmiProvider } from "wagmi"
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains"
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"

const config = createConfig({
	chains: [mainnet, arbitrum, polygon, base, optimism],
	connectors: [
		injected(),
		walletConnect({ projectId: "00000000000000000000000000000000" }),
		coinbaseWallet({ appName: "h.xyz" }),
	],
	transports: {
		[mainnet.id]: http(),
		[arbitrum.id]: http(),
		[polygon.id]: http(),
		[base.id]: http(),
		[optimism.id]: http(),
	},
})

const client = new QueryClient()

export function EvmProvider({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}

export { config as evmConfig }
