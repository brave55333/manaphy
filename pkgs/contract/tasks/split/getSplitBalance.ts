import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { createSplitClient, getSplitBalance } from "../../lib/splits";

/**
 * 【Task】get the balance of the Split Contract
 */
task("getSplitBalance", "get the balance of the Split Contract").setAction(
  async (_taskArgs: Record<string, never>, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "################################### [START] ###################################",
    );

    const [bobWalletClient] = await hre.viem.getWalletClients();

    if (!bobWalletClient.account?.address) {
      throw new Error("Wallet client account address is undefined");
    }

    const publicClient = await hre.viem.getPublicClient();

    // create Split contract instance
    await createSplitClient(publicClient, bobWalletClient);

    // Split Contract Address
    const splitContractAddress = "0x99fb47bFC921a0c039c518a7B7771Ff2Ae94dB73";
    // EURC
    const EURC_TOKEN_ADDRESS = "0x808456652fdb597867f38412077A9182bf77359F";

    // get the balance of the Split Contract
    const { splitBalance, warehouseBalance } = await getSplitBalance(
      splitContractAddress,
      EURC_TOKEN_ADDRESS,
    );

    console.log("splitBalance:", splitBalance);
    console.log("warehouseBalance:", warehouseBalance);

    console.log(
      "################################### [END] ###################################",
    );
  },
);
