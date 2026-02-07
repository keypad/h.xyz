"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { createContext, useContext, useMemo } from "react"
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi"
import type { ChainType } from "../providers/types"

type WalletState = {
	chain: ChainType
	address: string | null
	connected: boolean
	connecting: boolean
	connect: (chain: ChainType) => void
	disconnect: () => void
	signer: any
}

const WalletContext = createContext<WalletState>({
	chain: "evm",
	address: null,
	connected: false,
	connecting: false,
	connect: () => {},
	disconnect: () => {},
	signer: null,
})

export function useWalletContext() {
	return useContext(WalletContext)
}

export function WalletContextProvider({
	chain,
	children,
}: {
	chain: ChainType
	children: React.ReactNode
}) {
	const evm = useAccount()
	const { connect: evmConnect, connectors, isPending: evmConnecting } = useConnect()
	const { disconnect: evmDisconnect } = useDisconnect()
	const { data: walletClient } = useWalletClient()

	const sol = useWallet()

	const state = useMemo<WalletState>(() => {
		if (chain === "solana") {
			return {
				chain,
				address: sol.publicKey?.toBase58() ?? null,
				connected: sol.connected,
				connecting: sol.connecting,
				connect: () => sol.select("Phantom" as any),
				disconnect: () => sol.disconnect(),
				signer: sol,
			}
		}

		return {
			chain,
			address: evm.address ?? null,
			connected: evm.isConnected,
			connecting: evmConnecting,
			connect: () => {
				const injected = connectors.find((c) => c.id === "injected")
				if (injected) evmConnect({ connector: injected })
			},
			disconnect: () => evmDisconnect(),
			signer: walletClient ?? null,
		}
	}, [chain, evm, evmConnect, evmConnecting, evmDisconnect, connectors, walletClient, sol])

	return <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
}
