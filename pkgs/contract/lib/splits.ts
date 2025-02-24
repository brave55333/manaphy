import { SplitV2Client } from "@0xsplits/splits-sdk";
import { SplitV2Type } from "@0xsplits/splits-sdk/types";
import * as dotenv from "dotenv";
import { PublicClient, WalletClient } from "viem";
import { baseSepolia } from "viem/chains";

dotenv.config();

const { SPLITS_API_KEY } = process.env;

let splitsClient: SplitV2Client;

/**
 * Split Contract用のインスタンスを生成するメソッド
 */
export const createSplitClient = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
) => {
  // インスタンスを生成
  splitsClient = new SplitV2Client({
    chainId: baseSepolia.id,
    publicClient: publicClient,
    walletClient: walletClient,
    apiConfig: {
      apiKey: SPLITS_API_KEY ? SPLITS_API_KEY : "",
    },
  });
};

/**
 * getBalace method
 */
export const getSplitBalance = async (
  splitContractAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
) => {
  // get split balance
  const response = await splitsClient.getSplitBalance({
    splitAddress: splitContractAddress,
    tokenAddress: tokenAddress,
  });

  const splitBalance = Number(response.splitBalance) / 10 ** 6;
  const warehouseBalance = Number(response.warehouseBalance) / 10 ** 6;

  return {
    splitBalance,
    warehouseBalance,
  };
};

/**
 * Create Split Contract
 */
export const createSplit = async (walletAddress: `0x${string}`) => {
  // create split
  const response = await splitsClient.createSplit({
    recipients: [
      {
        address: "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
        percentAllocation: 50.0,
      },
      {
        address: "0x1295BDc0C102EB105dC0198fdC193588fe66A1e4",
        percentAllocation: 50.0,
      },
    ],
    distributorFeePercent: 1.0,
    totalAllocationPercent: 100.0,
    splitType: SplitV2Type.Push,
    ownerAddress: walletAddress,
    creatorAddress: walletAddress,
    salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
  });

  console.log("create split response:", response);

  return response.splitAddress;
};

/**
 * トークンを分配するメソッド
 */
export const distributeToken = async (
  splitContractAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  distributor: `0x${string}`,
) => {
  // distribute token
  const response = await splitsClient.distribute({
    splitAddress: splitContractAddress,
    tokenAddress: tokenAddress,
    distributorAddress: distributor,
  });

  console.log("distribute response:", response);
};
