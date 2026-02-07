export type Message = {
	id: number
	folder: string
	from: string
	subject: string
	preview: string
	time: string
	unread: boolean
	body: string
	quote?: string
	after?: string
}

export const messages: Message[] = [
	{
		id: 1,
		folder: "inbox",
		from: "bob@h.xyz",
		subject: "ethdenver plans",
		preview:
			"are you coming next week? we just shipped the new batch auction engine — 40% better surplus...",
		time: "today",
		unread: true,
		quote:
			"can you review the surplus distribution model and confirm what should ship in v2 vs v3?",
		body: "hey,\n\nare you coming to ethdenver next week? we just shipped the new batch auction engine — 40% better surplus capture across the board.\n\nwant to walk you through the numbers over dinner wednesday. also need your input on something:",
		after:
			"the discussion is in the #protocol channel. would be good to align before the talk on thursday.\n\nlet me know.\n\n— bob",
	},
	{
		id: 2,
		folder: "inbox",
		from: "Ethereum Foundation",
		subject: "security advisory: client update v4.2.2",
		preview:
			"we've identified a potential vulnerability in the latest consensus client update. all operators...",
		time: "today",
		unread: true,
		body: "hi,\n\nwe've identified a potential vulnerability in the latest consensus client update (v4.2.1). all validator operators should update to v4.2.2 immediately.\n\nthis patch addresses a critical edge case in block attestation that could lead to incorrect finality under specific network conditions.\n\nplease update your nodes at your earliest convenience.\n\n— ethereum foundation security team",
	},
	{
		id: 3,
		folder: "inbox",
		from: "alice.eth",
		subject: "gm",
		preview: "sent you 0.1 ETH for the coffee yesterday. see you at ethdenver next week?",
		time: "yesterday",
		unread: true,
		body: "hey!\n\njust sent you 0.1 ETH for the coffee yesterday. see you at ethdenver next week? heard the keynote lineup is insane this year.\n\n— alice",
	},
	{
		id: 4,
		folder: "inbox",
		from: "Uniswap",
		subject: "governance: proposal UNI-247",
		preview:
			"a new governance proposal has been submitted. vote on fee tier adjustments for v4 pools...",
		time: "yesterday",
		unread: false,
		body: "a new governance proposal has been submitted to the uniswap dao.\n\nproposal UNI-247: fee tier adjustments for v4 concentrated liquidity pools. the proposal suggests reducing the default fee from 0.3% to 0.25% for major pairs.\n\nvoting ends feb 14, 2026.\n\nview proposal and cast your vote on governance.uniswap.org",
	},
	{
		id: 5,
		folder: "inbox",
		from: "h.xyz",
		subject: "welcome to h.xyz",
		preview: "your email address is now active. all messages are end-to-end encrypted by default.",
		time: "2 days ago",
		unread: false,
		body: "welcome to h.xyz!\n\nyour email address you@h.xyz is now active.\n\n— end-to-end encrypted by default\n— no personal data stored\n— connected to your wallet\n\nyou can start sending and receiving messages immediately.",
	},
	{
		id: 6,
		folder: "inbox",
		from: "OpenSea",
		subject: "new offer on your collection",
		preview:
			"someone made an offer of 2.4 ETH on item #0042 in your collection. review and accept...",
		time: "3 days ago",
		unread: false,
		body: "you received a new offer.\n\ncollection: genesis artifacts\nitem: #0042\noffer: 2.4 ETH ($6,834.31)\nfrom: 0x7a2e...f391\nexpires: feb 10, 2026\n\nview and accept on opensea.io",
	},
	{
		id: 7,
		folder: "sent",
		from: "to alice.eth",
		subject: "re: gm",
		preview: "yes! landing wednesday afternoon. let's grab dinner at that ramen place near...",
		time: "today",
		unread: false,
		body: "yes! landing wednesday afternoon. let's grab dinner at that ramen place near the convention center.\n\nalso — thanks for the ETH, didn't have to do that.\n\nsee you there.",
	},
	{
		id: 8,
		folder: "sent",
		from: "to bob@h.xyz",
		subject: "re: ethdenver plans",
		preview: "definitely coming. dinner wednesday works. i'll review the surplus model tonight...",
		time: "today",
		unread: false,
		body: "definitely coming. dinner wednesday works.\n\ni'll review the surplus model tonight and send thoughts before we meet. leaning toward pushing the rebate mechanism to v3.\n\nsee you there.",
	},
	{
		id: 9,
		folder: "sent",
		from: "to 0x7a2e...f391",
		subject: "counter offer: #0042",
		preview: "appreciate the offer but looking for at least 3.2 ETH on this piece...",
		time: "2 days ago",
		unread: false,
		body: "appreciate the offer but looking for at least 3.2 ETH on this piece. it's one of the first 50 minted and has provenance from the original drop.\n\nlet me know if you'd like to counter.",
	},
	{
		id: 10,
		folder: "snoozed",
		from: "Aave",
		subject: "governance: risk parameter update",
		preview: "the aave risk council has proposed changes to the collateral factors for wstETH...",
		time: "3 days ago",
		unread: false,
		body: "the aave risk council has proposed changes to the collateral factors for wstETH and rETH on ethereum mainnet.\n\nproposed changes:\n— wstETH LTV: 75% → 78%\n— rETH LTV: 72% → 75%\n\nvoting opens feb 8, 2026.\n\nreview the full proposal on governance.aave.com",
	},
	{
		id: 11,
		folder: "snoozed",
		from: "ENS",
		subject: "domain renewal: you.eth",
		preview: "your ENS domain you.eth expires in 30 days. renew now to keep your identity...",
		time: "5 days ago",
		unread: false,
		body: "your ENS domain you.eth is expiring soon.\n\ndomain: you.eth\nexpires: march 9, 2026\nrenewal cost: ~0.003 ETH/year\n\nrenew at app.ens.domains to avoid losing your name.",
	},
	{
		id: 12,
		folder: "starred",
		from: "bob@h.xyz",
		subject: "surplus model v2 spec",
		preview: "here's the full spec for the surplus distribution model. key changes from v1...",
		time: "last week",
		unread: false,
		body: "here's the full spec for the surplus distribution model.\n\nkey changes from v1:\n— proportional distribution instead of flat\n— 72h settlement window\n— retroactive rebates for high-volume traders\n\ni've attached the simulation results. the new model captures 40% more surplus while keeping gas costs flat.\n\nlet me know what you think.\n\n— bob",
	},
	{
		id: 13,
		folder: "starred",
		from: "vitalik.eth",
		subject: "re: account abstraction feedback",
		preview: "thanks for the writeup. i think the approach to social recovery is solid but...",
		time: "last week",
		unread: false,
		body: "thanks for the writeup. i think the approach to social recovery is solid but the guardian rotation mechanism needs more thought.\n\nspecifically: what happens if 2 of 3 guardians go offline permanently? the timeout-based fallback you proposed could work but 90 days feels too long.\n\nwould love to discuss more at ethdenver if you're around.",
	},
	{
		id: 14,
		folder: "trash",
		from: "noreply@scam.xyz",
		subject: "you won 10,000 USDT! claim now",
		preview: "congratulations! your wallet has been selected for an exclusive airdrop of 10,000...",
		time: "4 days ago",
		unread: false,
		body: "congratulations! your wallet has been selected for an exclusive airdrop of 10,000 USDT.\n\nconnect your wallet at totally-legit-site.xyz to claim.\n\n(this message was automatically flagged as suspicious)",
	},
	{
		id: 15,
		folder: "trash",
		from: "token-launch@spam.io",
		subject: "exclusive presale: 1000x gem",
		preview: "don't miss the next moonshot! our AI-powered defi protocol is launching in 24h...",
		time: "5 days ago",
		unread: false,
		body: "don't miss the next moonshot! our AI-powered defi protocol is launching in 24 hours.\n\nearly investors get 50% bonus tokens.\n\n(this message was automatically flagged as spam)",
	},
]

export const folders = [
	{
		id: "inbox",
		icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
	},
	{
		id: "sent",
		icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5",
	},
	{
		id: "snoozed",
		icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
	},
	{
		id: "starred",
		icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
	},
	{
		id: "trash",
		icon: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
	},
]
