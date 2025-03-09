import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

/**
 * getConfig function
 * @returns
 */
export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "ブロックチェーン物流システム",
      preference: "smartWalletOnly",
      version: "4",
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [baseSepolia.id]: http(), // add baseSepolia for testing
  },
});
