import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { Address, decodeEventLog } from "viem";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * 【Task】create split contract
 */
task("createSplit", "create Split contract").setAction(
  async (_taskArgs: Record<string, never>, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "################################### [START] ###################################",
    );

    const publicClient = await hre.viem.getPublicClient();

    // get contract Address
    const PullSplitFactoryAddress = getContractAddress(
      publicClient.chain.id.toString(),
      "SplitModule#PullSplitFactory",
    );

    const [bobWalletClient] = await hre.viem.getWalletClients();

    if (!bobWalletClient.account?.address) {
      throw new Error("Wallet client account address is undefined");
    }

    // get PullSplit Contract Instance
    const pullSplitFactoryContract = await hre.viem.getContractAt(
      "PullSplitFactory",
      PullSplitFactoryAddress as `0x${string}`,
    );

    // address1とaddress2に50%ずつ配分するSplitを作成
    const txHash = await pullSplitFactoryContract.write.createSplit([
      {
        recipients: [
          "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
          "0x1295BDc0C102EB105dC0198fdC193588fe66A1e4",
        ],
        allocations: [50n, 50n],
        totalAllocation: 100n,
        distributionIncentive: 0,
      },
      bobWalletClient.account?.address,
      bobWalletClient.account?.address,
    ]);
    // トランザクションデータを取得する。
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    let splitAddress: Address | undefined;

    for (const log of receipt.logs) {
      try {
        // 意図したイベントが発生しているか確認する
        const decodedLog = decodeEventLog({
          abi: pullSplitFactoryContract.abi,
          data: log.data,
          topics: log.topics,
        });
        if (decodedLog.eventName === "SplitCreated") {
          //@ts-ignore
          splitAddress = decodedLog.args.split;
          console.log("splitAddress:", splitAddress);
        }
      } catch (error) {}
    }

    console.log(
      "################################### [END] ###################################",
    );
  },
);
