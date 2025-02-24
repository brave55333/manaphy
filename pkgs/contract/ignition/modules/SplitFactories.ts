import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { getContractAddress } from "../../helpers/contractJsonIgnitionHelper";

/**
 * PullSplitsFactory と PushSplitsFactory のデプロイスクリプト
 */
const SplitFactoriesModule = buildModule("SplitModule", (m) => {
  // get Contract address
  const SplitsWarehouseAddress = getContractAddress(
    "84532",
    "SplitModule#SplitsWarehouse",
  );

  console.log("SplitsWarehouseAddress: ", SplitsWarehouseAddress);

  // deploy PullSplitsFactory Contract
  const PullSplitsFactory = m.contract("PullSplitFactory", [
    SplitsWarehouseAddress as string,
  ]);
  // deploy PushSplitsFactory Contract
  const PushSplitsFactory = m.contract("PushSplitFactory", [
    SplitsWarehouseAddress as string,
  ]);

  return { PullSplitsFactory, PushSplitsFactory };
});

export default SplitFactoriesModule;
