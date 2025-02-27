import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { console } from "node:inspector";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * 【Task】withdraw from SplitsWarehouse Contract
 */
task("withdraw", "withdraw from SplitsWarehouse Contract")
  .addParam("token", "token Address of withdraw")
  .setAction(
    async (taskArgs: Record<string, never>, hre: HardhatRuntimeEnvironment) => {
      console.log(
        "################################### [START] ###################################",
      );

      const publicClient = await hre.viem.getPublicClient();
      // get owner account
      const [bobWalletClient] = await hre.viem.getWalletClients();

      // get SplitsWarehouse contract Address
      const SplitsWarehouseAddress = getContractAddress(
        publicClient.chain.id.toString(),
        "SplitModule#SplitsWarehouse",
      );

      // get splitsWarehouse Contract Instance
      const splitsWarehouseContract = await hre.viem.getContractAt(
        "SplitsWarehouse",
        SplitsWarehouseAddress as `0x${string}`,
      );

      // withdraw from SplitsWarehouse Contract
      const txHash = await splitsWarehouseContract.write.withdraw([
        bobWalletClient.account.address,
        taskArgs.token,
      ]);

      console.log("txHash:", txHash);

      console.log(
        "################################### [END] ###################################",
      );
    },
  );
