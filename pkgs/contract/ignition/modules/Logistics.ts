import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * LogisticsContractのデプロイスクリプト
 */
const LogisticsModule = buildModule("LogisticsModule", (m) => {
  // deploy Logistics Contract
  const Logistics = m.contract("Logistics");

  return { Logistics };
});

export default LogisticsModule;
