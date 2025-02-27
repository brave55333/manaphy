import { parseEther } from "ethers";
import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { console } from "node:inspector";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * 【Task】deposit to split contract
 */
task("deposit", "deposit to split contract")
  .addParam("id", "order ID")
  .addParam("amount", "amount")
  .setAction(
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

      // get Logistics Contract Instance
      const logisticsContract = await hre.viem.getContractAt(
        "Logistics",
        LogisticsAddress as `0x${string}`,
      );

      // get order data
      const orderData = await logisticsContract.read.getOrder([
        BigInt(taskArgs.id),
      ]);

      // deposit to split contract address
      const txHash = await bobWalletClient.sendTransaction({
        account: bobWalletClient.account,
        to: orderData.splitContract,
        value: parseEther(taskArgs.amount),
        chain: publicClient.chain,
      });

      console.log("txHash:", txHash);

      console.log(
        "################################### [END] ###################################",
      );
    },
  );
