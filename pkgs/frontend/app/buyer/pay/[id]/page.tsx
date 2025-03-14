"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrderQuery } from "@/graphql";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import { useCallback, useState } from "react";
import { useQuery } from "urql";
import { parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import { useSendTransaction } from "wagmi";

/**
 * PaymentPage Component
 * @param param0
 * @returns
 */
export default function PaymentPage({ params }: { params: { id: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: hash, sendTransaction } = useSendTransaction();

  //get All Orders info
  const [result] = useQuery({
    query: getOrderQuery,
    variables: { orderId: Number(params.id) },
  });
  const { data: order } = result;

  const generateTransaction = useCallback(async () => {
    return [
      {
        to: order.orderCreateds[0].splitContract as `0x${string}`,
        value: parseEther("0.1"),
        data: "0x" as const,
      },
    ];
  }, [order]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">注文 {params.id} の支払い</h1>
      <Card>
        <CardHeader>
          <CardTitle>支払い詳細</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">支払い金額（配送料込み）</Label>
              <Input id="amount" type="number" placeholder="金額を入力" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-address">ウォレットアドレス</Label>
              <Input
                id="wallet-address"
                placeholder="ウォレットアドレスを入力"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping-address">配送先住所</Label>
              <Input id="shipping-address" placeholder="配送先住所を入力" />
            </div>
            <Transaction
              chainId={baseSepolia.id}
              calls={generateTransaction}
              onStatus={() => setIsModalOpen(true)}
              className="text-black"
            >
              <TransactionButton text="支払う" className="" />
              <TransactionSponsor />
              <TransactionStatus>
                <TransactionStatusLabel />
                <TransactionStatusAction />
              </TransactionStatus>
            </Transaction>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
