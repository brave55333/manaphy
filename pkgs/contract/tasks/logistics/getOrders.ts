import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { console } from "node:inspector";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * 【Task】get orders from Logistics contract
 */
task("getAllOrders", "get orders from Logistics contract").setAction(
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
    const orderDatas = await logisticsContract.read.getAllOrders();

    console.log("orderDatas:", orderDatas);

    console.log(
      "################################### [END] ###################################",
    );
  },
);
