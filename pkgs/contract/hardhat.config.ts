import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-viem";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/config";
import fs from "node:fs";
import path from "node:path";

dotenv.config();

const {
  PRIVATE_KEY,
  ALCHEMY_API_KEY,
  COINMARKETCAP_API_KEY,
  BASESCAN_API_KEY,
} = process.env;

// タスクファイルを読み込むための設定
const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = ["", "utils", "split", "logistics"];
  for (const folder of taskPaths) {
    const tasksPath = path.join(__dirname, "tasks", folder);
    const taskFiles = fs
      .readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"));
    for (const task of taskFiles) {
      require(`${tasksPath}/${task}`);
    }
  }
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          viaIR: true,
          optimizer: {
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    baseSepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      baseSepolia: BASESCAN_API_KEY ?? "",
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    token: "ETH",
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
