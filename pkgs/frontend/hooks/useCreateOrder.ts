import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { addresses } from "../config/address";
import abi from "../lib/abi.json";

// 注文作成用のパラメータ型
export type CreateOrderParams = {
  destinationX: bigint;
  destinationY: bigint;
  productName: string;
  quantity: bigint;
  price: bigint;
  shippingFee: bigint;
  owner: `0x${string}`;
  creator: `0x${string}`;
  recipients: `0x${string}`[];
  allocations: bigint[];
  totalAllocation?: bigint;
  distributionIncentive?: number;
  tokenAddress?: `0x${string}`;
};

// ETHのデフォルトアドレス
const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as const;

/**
 * 注文作成用のカスタムフック
 *
 * @example
 * // 基本的な使用方法
 * const { createOrder, isPending, isSuccess, isError, error, hash, isConfirming, isConfirmed, receipt } = useCreateOrder();
 * const { address } = useAccount();
 *
 * // 注文作成の実行
 * createOrder({
 *   destinationX: BigInt(10),
 *   destinationY: BigInt(20),
 *   productName: "商品名",
 *   quantity: BigInt(5),
 *   price: BigInt(100),
 *   shippingFee: BigInt(10),
 *   owner: address,
 *   creator: address,
 *   recipients: ["0x123...", "0x456..."],
 *   allocations: [BigInt(50), BigInt(50)]
 * });
 *
 * // トランザクションの状態を確認
 * if (isPending) {
 *   console.log("トランザクション送信中...");
 * } else if (isConfirming) {
 *   console.log("トランザクション確認中...");
 * } else if (isConfirmed) {
 *   console.log("トランザクション完了！", receipt);
 * }
 *
 * @returns {Object} createOrder関数と関連するステート
 */
export function useCreateOrder() {
  const {
    writeContract,
    isPending,
    isSuccess,
    isError,
    error,
    data: hash,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const createOrder = (params: CreateOrderParams) => {
    const {
      destinationX,
      destinationY,
      productName,
      quantity,
      price,
      shippingFee,
      owner,
      creator,
      recipients,
      allocations,
      totalAllocation = BigInt(100),
      distributionIncentive = 0,
      tokenAddress = ETH_ADDRESS,
    } = params;

    return writeContract({
      address: addresses.Logistics as `0x${string}`,
      abi,
      functionName: "createOrder",
      args: [
        destinationX,
        destinationY,
        productName,
        quantity,
        price,
        shippingFee,
        addresses.PullSplitFactory as `0x${string}`,
        {
          recipients,
          allocations,
          totalAllocation,
          distributionIncentive,
        },
        owner,
        creator,
        tokenAddress,
      ],
    });
  };

  return {
    createOrder,
    isPending,
    isSuccess,
    isError,
    error,
    hash,
    isConfirming,
    isConfirmed,
    receipt,
  };
}
