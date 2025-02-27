import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { console } from "node:inspector";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * 【Task】get orders from Logistics contract
 */
task("getOrder", "get order from Logistics contract")
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

      // get order datas
      const orderData = await logisticsContract.read.getOrder([
        BigInt(taskArgs.id),
      ]);

      console.log("orderDatas:", orderData);

      console.log(
        "################################### [END] ###################################",
      );
    },
  );
