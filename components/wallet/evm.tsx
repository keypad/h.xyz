"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { createConfig, createStorage, http, noopStorage, WagmiProvider } from "wagmi"
import { arbitrum, base, gnosis, mainnet, optimism, polygon } from "wagmi/chains"
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"

const wc = process.env.NEXT_PUBLIC_WALLETCONNECT_ID

const connectors = [
	injected(),
	coinbaseWallet({ appName: "h.xyz" }),
	...(wc ? [walletConnect({ projectId: wc })] : []),
]

const config = createConfig({
	chains: [mainnet, gnosis, arbitrum, polygon, base, optimism],
	connectors,
	storage: createStorage({ storage: noopStorage }),
	transports: {
		[mainnet.id]: http(),
		[gnosis.id]: http(),
		[arbitrum.id]: http(),
		[polygon.id]: http(),
		[base.id]: http(),
		[optimism.id]: http(),
	},
})

const client = new QueryClient()

export function EvmProvider({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config} reconnectOnMount={false}>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}

export { config as evmConfig }
