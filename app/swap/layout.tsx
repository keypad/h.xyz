import type { Metadata } from "next"
import { EvmProvider } from "@/components/wallet/evm"
import { SolanaProvider } from "@/components/wallet/solana"

export const metadata: Metadata = {
	title: "swap",
	description: "swap tokens across chains. zero logging. zero tracking.",
	openGraph: {
		title: "swap | h.xyz",
		description: "5 providers. best rates. zero logging. zero tracking.",
		images: [{ url: "/swap/opengraph-image", width: 1200, height: 630 }],
	},
}

export default function SwapLayout({ children }: { children: React.ReactNode }) {
	return (
		<EvmProvider>
			<SolanaProvider>{children}</SolanaProvider>
		</EvmProvider>
	)
}
