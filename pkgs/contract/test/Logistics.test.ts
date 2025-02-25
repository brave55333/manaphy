import { expect } from "chai";
import hre from "hardhat";
import { decodeEventLog, parseEther } from "viem";

describe("Logistics", () => {
  /**
   * デプロイ用のメソッド
   * @returns
   */
  async function deployLogisticsFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    // deploy SplitsWarehouse Contract
    const SplitsWarehouse = await hre.viem.deployContract("SplitsWarehouse", [
      "ETH",
      "ETH",
    ]);
    // deploy PullSplitsFactory Contract
    const PullSplitFactory = await hre.viem.deployContract("PullSplitFactory", [
      SplitsWarehouse.address,
    ]);
    const Logistics = await hre.viem.deployContract("Logistics", []);
    const publicClient = await hre.viem.getPublicClient();

    return {
      owner,
      otherAccount,
      PullSplitFactory,
      Logistics,
      publicClient,
      SplitsWarehouse,
    };
  }

  describe("Order Management", () => {
    it("Should create an order and emit OrderCreated event", async () => {
      const { Logistics, owner, otherAccount, PullSplitFactory, publicClient } =
        await deployLogisticsFixture();

      // 注文を作成
      const txHash = await Logistics.write.createOrder([
        10n, // destinationX
        20n, // destinationY
        "Test Product", // productName
        5n, // quantity
        100n, // price
        10n, // shippingFee
        PullSplitFactory.address, // pullSplitFactoryAddress
        {
          recipients: [owner.account?.address, otherAccount.account?.address],
          allocations: [50n, 50n],
          totalAllocation: 100n,
          distributionIncentive: 0,
        }, // splitParams
        owner.account?.address, // owner
        owner.account?.address, // creator
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // tokenAddress (ETH)
      ]);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      let eventFound = false;

      for (const log of receipt.logs) {
        try {
          const decodedLog = decodeEventLog({
            abi: Logistics.abi,
            data: log.data,
            topics: log.topics,
          });
          if (decodedLog.eventName === "OrderCreated") {
            eventFound = true;
            break;
          }
        } catch (error) {}
      }

      expect(eventFound).to.be.true;
    });

    it("Should update order status and emit OrderStatusChanged event", async () => {
      const {
        Logistics,
        owner,
        PullSplitFactory,
        otherAccount,
        publicClient,
        SplitsWarehouse,
      } = await deployLogisticsFixture();

      await Logistics.write.createOrder([
        10n, // destinationX
        20n, // destinationY
        "Test Product", // productName
        5n, // quantity
        100n, // price
        10n, // shippingFee
        PullSplitFactory.address, // pullSplitFactoryAddress
        {
          recipients: [owner.account?.address, otherAccount.account?.address],
          allocations: [50n, 50n],
          totalAllocation: 100n,
          distributionIncentive: 0,
        }, // splitParams
        owner.account?.address, // owner
        owner.account?.address, // creator
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // tokenAddress (ETH)
      ]);

      // 注文情報を取得する。
      const order = await Logistics.read.getOrder([0n]);
      // Splitコントラクトのアドレスを取得する。
      const splitAddress = order.splitContract;

      // Splitコントラクトに1ETH送金
      await owner.sendTransaction({
        account: owner.account,
        to: splitAddress,
        value: parseEther("1"),
        chain: undefined,
      });

      // 分配前の残高を取得する。
      const beforeAddress2Balance = await publicClient.getBalance({
        address: otherAccount.account?.address,
      });

      // 注文ステータスを更新
      // Change to Delivered
      const txHash = await Logistics.write.updateOrderStatus([0n, 3]);
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      let eventFound = false;

      for (const log of receipt.logs) {
        try {
          const decodedLog = decodeEventLog({
            abi: Logistics.abi,
            data: log.data,
            topics: log.topics,
          });
          if (decodedLog.eventName === "OrderStatusChanged") {
            eventFound = true;
            break;
          }
        } catch (error) {}
      }

      expect(eventFound).to.be.true;

      // withdrawを実行
      await SplitsWarehouse.write.withdraw(
        [
          otherAccount.account.address,
          "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        ],
        {
          account: otherAccount.account,
        },
      );

      // distributeの残高を取得する。
      const afterAddress2Balance = await publicClient.getBalance({
        address: otherAccount.account?.address,
      });

      // 残高が増えているか確認
      expect(Number(afterAddress2Balance) - Number(beforeAddress2Balance)).gt(
        499900000000000000,
      );
    });
  });
});
