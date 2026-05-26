// src/context/Web3Config.js
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";

// ✅ Supported networks
const networks = [mainnet, arbitrum];

// ✅ Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: "879024f417c360a14ce1a4d118516e79",
  ssr: false,
});

// ✅ Prevent duplicate initialization in Vite dev mode
let appKitInitialized = false;

export function initAppKit() {
  if (appKitInitialized) return;

  createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId: "879024f417c360a14ce1a4d118516e79",

    metadata: {
      name: "COINIQ",
      description: "Crypto Tracker & Portfolio",
      // ✅ Dynamic origin for localhost/production tracking
      url: window.location.origin,
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },

    features: {
      analytics: false, // Disables telemetry to prevent ERR_BLOCKED_BY_CLIENT
    },
  });

  appKitInitialized = true;
}
