import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { console } from "node:inspector";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * 【Task】updateOrderStatus
 */
task("updateOrderStatus", "update Order Status")
  .addParam("id", "order ID")
  .setAction(
    async (taskArgs: Record<string, never>, hre: HardhatRuntimeEnvironment) => {
      console.log(
        "################################### [START] ###################################",
      );

      const publicClient = await hre.viem.getPublicClient();

      // get Logistics contract Address
      const LogisticsAddress = getContractAddress(
        publicClient.chain.id.toString(),
        "LogisticsModule#Logistics",
      );

      // get Logistics Contract Instance
      const logisticsContract = await hre.viem.getContractAt(
        "Logistics",
        LogisticsAddress as `0x${string}`,
      );

      // update to Devilered status
      const txHash = await logisticsContract.write.updateOrderStatus([
        BigInt(taskArgs.id),
        3,
      ]);

      console.log("txHash:", txHash);

      console.log(
        "################################### [END] ###################################",
      );
    },
  );
