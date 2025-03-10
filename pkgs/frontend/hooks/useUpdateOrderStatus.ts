import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import abi from "../lib/abi.json";
import { addresses } from "../config/address";

// 注文ステータス更新用のパラメータ型
export type UpdateOrderStatusParams = {
  orderId: bigint | number;
  newStatus: number; // 0: Pending, 1: Processing, 2: Shipped, 3: Delivered, etc.
};

/**
 * 注文ステータス更新用のカスタムフック
 *
 * @example
 * // 基本的な使用方法
 * const { updateOrderStatus, isPending, isSuccess, isError, error, hash, isConfirming, isConfirmed, receipt } = useUpdateOrderStatus();
 *
 * // ステータス更新の実行
 * updateOrderStatus({
 *   orderId: 1,
 *   newStatus: 3 // 3 = Delivered
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
 * @example
 * // ステータス定数を使用する場合
 * enum OrderStatus {
 *   Pending = 0,
 *   Processing = 1,
 *   Shipped = 2,
 *   Delivered = 3
 * }
 *
 * updateOrderStatus({
 *   orderId: 1,
 *   newStatus: OrderStatus.Delivered
 * });
 *
 * @returns {Object} updateOrderStatus関数と関連するステート
 */
export function useUpdateOrderStatus() {
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

  // 注文ステータスの更新
  const updateOrderStatus = (params: UpdateOrderStatusParams) => {
    const { orderId, newStatus } = params;

    return writeContract({
      address: addresses.Logistics as `0x${string}`,
      abi,
      functionName: "updateOrderStatus",
      args: [BigInt(orderId), newStatus],
    });
  };

  return {
    updateOrderStatus,
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
