import type { Metadata } from "next"
import { EvmProvider } from "@/components/wallet/evm"
import { SolanaProvider } from "@/components/wallet/solana"

export const metadata: Metadata = {
	title: "swap",
	description: "swap tokens across chains. zero logging. zero tracking.",
}

export default function SwapLayout({ children }: { children: React.ReactNode }) {
	return (
		<EvmProvider>
			<SolanaProvider>{children}</SolanaProvider>
		</EvmProvider>
	)
}
