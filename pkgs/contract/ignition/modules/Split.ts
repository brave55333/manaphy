import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * SplitContractのデプロイスクリプト
 */
const SplitModule = buildModule("SplitModule", (m) => {
  // デプロイ時のパラメーター
  const nativeTokenName = m.getParameter("_native_token_name", "ETH");
  const nativeTokenSymbol = m.getParameter("_native_token_symbol", "ETH");

  // deploy SplitsWarehouse Contract
  const SplitsWarehouse = m.contract("SplitsWarehouse", [
    nativeTokenName,
    nativeTokenSymbol,
  ]);

  return { SplitsWarehouse };
});

export default SplitModule;
