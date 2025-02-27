import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { console } from "node:inspector";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * 【Task】create order
 */
task("createOrder", "create Order").setAction(
  async (taskArgs: Record<string, never>, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "################################### [START] ###################################",
    );

    const publicClient = await hre.viem.getPublicClient();
    // get owner account
    const [bobWalletClient] = await hre.viem.getWalletClients();

    // get Logistics contract Address
    const LogisticsAddress = getContractAddress(
      publicClient.chain.id.toString(),
      "LogisticsModule#Logistics",
    );

    const PullSplitFactoryAddress = getContractAddress(
      publicClient.chain.id.toString(),
      "SplitModule#PullSplitFactory",
    );

    // get Logistics Contract Instance
    const logisticsContract = await hre.viem.getContractAt(
      "Logistics",
      LogisticsAddress as `0x${string}`,
    );

    // address1とaddress2に50%ずつ配分するSplitを作成
    const txHash = await logisticsContract.write.createOrder([
      10n, // destinationX
      20n, // destinationY
      "Sample Product", // productName
      5n, // quantity
      100n, // price
      10n, // shippingFee
      PullSplitFactoryAddress as `0x${string}`, // pullSplitFactoryAddress
      {
        recipients: [
          "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
          "0x1295BDc0C102EB105dC0198fdC193588fe66A1e4",
        ],
        allocations: [50n, 50n],
        totalAllocation: 100n,
        distributionIncentive: 0,
      }, // splitParams
      bobWalletClient.account?.address, // owner
      bobWalletClient.account?.address, // creator
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // tokenAddress (ETH)
    ]);

    console.log("txHash:", txHash);

    // トランザクションデータを取得する。
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    console.log("receipt:", receipt);

    console.log(
      "################################### [END] ###################################",
    );
  },
);
