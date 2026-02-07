"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useRef, useState } from "react"
import { useConnect } from "wagmi"
import { useWalletContext } from "./context"

const EVM_WALLETS = [
	{
		name: "MetaMask",
		match: "metamask",
		icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
	},
	{
		name: "Coinbase Wallet",
		match: "coinbase",
		icon: "https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo-300x300.webp",
	},
	{
		name: "WalletConnect",
		match: "walletconnect",
		icon: "https://altcoinsbox.com/wp-content/uploads/2023/04/wallet-connect-logo-300x300.webp",
	},
	{
		name: "Phantom",
		match: "phantom",
		icon: "https://avatars.githubusercontent.com/u/78782331",
	},
	{
		name: "Rabby",
		match: "rabby",
		icon: "https://avatars.githubusercontent.com/u/92980039",
	},
]

const SOL_WALLETS = [
	{
		name: "Phantom",
		icon: "https://avatars.githubusercontent.com/u/78782331",
	},
	{
		name: "Solflare",
		icon: "https://solflare.com/favicon.svg",
	},
	{
		name: "Backpack",
		icon: "https://backpack.app/favicon.ico",
	},
]

export default function ConnectButton() {
	const { connecting, chain } = useWalletContext()
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const { connect: evmConnect, connectors } = useConnect()
	const sol = useWallet()

	useEffect(() => {
		if (!open) return
		function close(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		function keys(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false)
		}
		document.addEventListener("mousedown", close)
		document.addEventListener("keydown", keys)
		return () => {
			document.removeEventListener("mousedown", close)
			document.removeEventListener("keydown", keys)
		}
	}, [open])

	useEffect(() => {
		if (sol.wallet && !sol.connected && !sol.connecting) {
			sol.connect().catch(() => {})
		}
	}, [sol])

	if (connecting) {
		return (
			<button
				type="button"
				disabled
				className="mt-4 w-full rounded-xl bg-white/[0.06] py-3.5 text-sm font-medium text-white/40 md:py-4"
			>
				connecting...
			</button>
		)
	}

	const evmPick = (wallet: (typeof EVM_WALLETS)[0]) => {
		const match = wallet.match.toLowerCase()
		const connector =
			connectors.find((c) => c.name.toLowerCase().includes(match)) ||
			connectors.find((c) => c.id.toLowerCase().includes(match)) ||
			connectors.find((c) => c.id === "injected")
		if (connector) evmConnect({ connector })
	}

	const solPick = (wallet: (typeof SOL_WALLETS)[0]) => {
		const adapter = sol.wallets.find(
			(w) => w.adapter.name.toLowerCase() === wallet.name.toLowerCase(),
		)
		if (adapter) sol.select(adapter.adapter.name)
	}

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="mt-4 w-full rounded-xl bg-[#EC4612] py-3.5 text-sm font-medium text-white transition-all hover:brightness-110 md:py-4"
			>
				connect wallet
			</button>
			{open && (
				<div
					className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl border border-white/[0.06] bg-[#2a2826] p-1.5"
					style={{ animation: "slideup 150ms ease-out" }}
				>
					{chain === "solana"
						? SOL_WALLETS.map((w) => (
								<WalletRow key={w.name} name={w.name} icon={w.icon} onClick={() => { solPick(w); setOpen(false) }} />
							))
						: EVM_WALLETS.map((w) => (
								<WalletRow key={w.name} name={w.name} icon={w.icon} onClick={() => { evmPick(w); setOpen(false) }} />
							))}
				</div>
			)}
		</div>
	)
}

function WalletRow({ name, icon, onClick }: { name: string; icon: string; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
		>
			<img src={icon} alt="" width={20} height={20} className="rounded" />
			{name}
		</button>
	)
}
