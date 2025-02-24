import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

/**
 * 【Task】distribute token
 */
task("distribute", "distribute token").setAction(
  async (_taskArgs: Record<string, never>, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "################################### [START] ###################################",
    );

    const publicClient = await hre.viem.getPublicClient();

    const [bobWalletClient] = await hre.viem.getWalletClients();

    if (!bobWalletClient.account?.address) {
      throw new Error("Wallet client account address is undefined");
    }

    // get PullSplit Contract Instance
    const pullSplitContract = await hre.viem.getContractAt(
      "PullSplit",
      "0x99fb47bFC921a0c039c518a7B7771Ff2Ae94dB73",
    );

    // EURC
    const EURC_TOKEN_ADDRESS = "0x808456652fdb597867f38412077A9182bf77359F";

    // address1とaddress2に50%ずつ配分するSplitを作成
    const txHash = await pullSplitContract.write.distribute([
      {
        recipients: [
          "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
          "0x1295BDc0C102EB105dC0198fdC193588fe66A1e4",
        ],
        allocations: [50n, 50n],
        totalAllocation: 100n,
        distributionIncentive: 0,
      },
      EURC_TOKEN_ADDRESS,
      bobWalletClient.account.address,
    ]);
    // トランザクションデータを取得する。
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    console.log("Transaction Receipt: ", receipt);

    console.log(
      "################################### [END] ###################################",
    );
  },
);
