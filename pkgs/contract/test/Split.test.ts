import { expect } from "chai";
import hre from "hardhat";
import {
  Address,
  PublicClient,
  WalletClient,
  decodeEventLog,
  parseEther,
} from "viem";

describe("Split", () => {
  /**
   * validate Address method
   * @param client
   * @returns
   */
  const validateAddress = (client: WalletClient): Address => {
    if (!client.account?.address) {
      throw new Error("Wallet client account address is undefined");
    }
    return client.account.address;
  };

  /**
   * create Split contract
   * 今回は、50%ずつ配分するSplitを作成
   */
  const createSplit = async (
    PullSplitsFactory: any,
    address1Validated: Address,
    address2Validated: Address,
    publicClient: PublicClient,
  ) => {
    // address1とaddress2に50%ずつ配分するSplitを作成
    const txHash = await PullSplitsFactory.write.createSplit([
      {
        recipients: [address1Validated, address2Validated],
        allocations: [50n, 50n],
        totalAllocation: 100n,
        distributionIncentive: 0,
      },
      address1Validated,
      address1Validated,
    ]);
    // トランザクションデータを取得する。
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    return receipt;
  };

  /**
   * Deploy Contract
   * @returns
   */
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    // deploy SplitsWarehouse Contract
    const SplitsWarehouse = await hre.viem.deployContract("SplitsWarehouse", [
      "ETH",
      "ETH",
    ]);
    // deploy PullSplitsFactory Contract
    const PullSplitsFactory = await hre.viem.deployContract(
      "PullSplitFactory",
      [SplitsWarehouse.address],
    );
    // deploy PushSplitsFactory Contract
    const PushSplitsFactory = await hre.viem.deployContract(
      "PushSplitFactory",
      [SplitsWarehouse.address],
    );

    const publicClient = await hre.viem.getPublicClient();

    const address1Validated = validateAddress(owner);
    const address2Validated = validateAddress(otherAccount);

    return {
      owner,
      otherAccount,
      address1Validated,
      address2Validated,
      publicClient,
      SplitsWarehouse,
      PullSplitsFactory,
      PushSplitsFactory,
    };
  }

  describe("Deployment", () => {
    it("should create PullSplits contract", async () => {
      // dpeloy Split contracts
      const {
        address1Validated,
        address2Validated,
        publicClient,
        PullSplitsFactory,
      } = await deployOneYearLockFixture();

      // address1とaddress2に50%ずつ配分するSplitを作成してトランザクションデータを取得する。
      const receipt = await createSplit(
        PullSplitsFactory,
        address1Validated,
        address2Validated,
        publicClient,
      );

      let splitAddress: Address | undefined;

      for (const log of receipt.logs) {
        try {
          // 意図したイベントが発生しているか確認する
          const decodedLog = decodeEventLog({
            abi: PullSplitsFactory.abi,
            data: log.data,
            topics: log.topics,
          });
          if (decodedLog.eventName === "SplitCreated") {
            splitAddress = decodedLog.args.split;
          }
        } catch (error) {}
      }

      if (!splitAddress) {
        throw new Error("Split address not found in transaction logs");
      }
    });

    it("Should destribute", async () => {
      // dpeloy Split contracts
      const {
        owner,
        otherAccount,
        address1Validated,
        address2Validated,
        publicClient,
        SplitsWarehouse,
        PullSplitsFactory,
      } = await deployOneYearLockFixture();

      if (!owner.account) {
        throw new Error("owner account is undefined");
      }

      // address1とaddress2に50%ずつ配分するSplitを作成してトランザクションデータを取得する。
      const receipt = await createSplit(
        PullSplitsFactory,
        address1Validated,
        address2Validated,
        publicClient,
      );

      let splitAddress: Address | undefined;

      for (const log of receipt.logs) {
        try {
          // 意図したイベントが発生しているか確認する
          const decodedLog = decodeEventLog({
            abi: PullSplitsFactory.abi,
            data: log.data,
            topics: log.topics,
          });
          if (decodedLog.eventName === "SplitCreated") {
            splitAddress = decodedLog.args.split;
          }
        } catch (error) {}
      }

      if (!splitAddress) {
        throw new Error("Split address not found in transaction logs");
      }

      // 作成されたSplitコントラクトのインスタンスを生成
      const DeployedPullSplit = await hre.viem.getContractAt(
        "PullSplit",
        splitAddress,
      );

      // Splitコントラクトに1ETH送金
      await owner.sendTransaction({
        account: owner.account,
        to: DeployedPullSplit.address,
        value: parseEther("1"),
        chain: undefined,
      });

      const beforeAddress2Balance = await publicClient.getBalance({
        address: address2Validated,
      });

      // distributeを実行
      await DeployedPullSplit.write.distribute(
        [
          {
            recipients: [address1Validated, address2Validated],
            allocations: [50n, 50n],
            totalAllocation: 100n,
            distributionIncentive: 0,
          },
          "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          address1Validated,
        ],
        {
          account: owner.account,
        },
      );

      // withdrawを実行
      await SplitsWarehouse.write.withdraw(
        [address1Validated, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"],
        {
          account: owner.account,
        },
      );

      // withdrawを実行
      await SplitsWarehouse.write.withdraw(
        [address2Validated, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"],
        {
          account: otherAccount.account,
        },
      );
      // distributeの残高を取得する。
      const afterAddress2Balance = await publicClient.getBalance({
        address: address2Validated,
      });

      // withdrawのガス代を引いて大体0.5ETH増えているはず
      expect(Number(afterAddress2Balance) - Number(beforeAddress2Balance)).gt(
        499900000000000000,
      );
    });
  });
});
