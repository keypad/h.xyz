"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import type { ReactNode } from "react"
import { useMemo } from "react"

const ENDPOINT = "https://api.mainnet-beta.solana.com"

export function SolanaProvider({ children }: { children: ReactNode }) {
	const wallets = useMemo(
		() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new BackpackWalletAdapter()],
		[],
	)

	return (
		<ConnectionProvider endpoint={ENDPOINT}>
			<WalletProvider wallets={wallets}>
				{children}
			</WalletProvider>
		</ConnectionProvider>
	)
}
