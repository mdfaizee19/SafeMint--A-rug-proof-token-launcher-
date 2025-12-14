// src/lib/walletConfig.js
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { http, createConfig } from "wagmi"
import { injected, walletConnect } from "wagmi/connectors"

/* ============================
   WalletConnect Project ID
   ============================ */
export const WALLETCONNECT_PROJECT_ID = "c388043e49869b19bee7f8a7313486bc"

/* ============================
   QIE Testnet Chain
   ============================ */
export const qieTestnet = {
  id: 1983,
  name: "QIE Testnet",
  nativeCurrency: {
    name: "tQIE",
    symbol: "tQIE",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        "https://testnetqierpc1.digital",
        // fallback RPCs
        "https://rpc.ankr.com/eth_goerli"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "QIE Explorer",
      url: "https://testnet.qie.digital"
    }
  }
}

/* ============================
   Wagmi Config (HARDENED)
   ============================ */
export const config = createConfig({
  chains: [qieTestnet],
  disableEns: true,
  pollingInterval: 12_000,
  transports: {
    [qieTestnet.id]: http({
      timeout: 7_000,
      retryCount: 1
    })
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: true
    })
  ]
})

// 🔁 Alias so imports can use either name
export const wagmiConfig = config

/* ============================
   Web3Modal (NO ANALYTICS)
   ============================ */
export const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId: WALLETCONNECT_PROJECT_ID,
  themeMode: "dark",
  enableAnalytics: false,
  enableOnramp: false,
  featuredWalletIds: [],
  includeWalletIds: []
})