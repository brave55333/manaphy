"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderQuery } from "@/graphql";
import { OrderStatusMap } from "@/lib/types";
import Image from "next/image";
import { useQuery } from "urql";

/**
 * OrderDetails Component
 */
export default function OrderDetails({ params }: { params: { id: string } }) {
  console.log("params", params.id);
  //get All Orders info
  const [result] = useQuery({
    query: getOrderQuery,
    variables: { orderId: Number(params.id) },
  });
  const { data: order } = result;

  //@ts-ignore
  let latestStatus: string = "-1";

  if (order !== undefined) {
    const updatedStatus = order.orderStatusChangeds;
    if (updatedStatus !== undefined) {
      console.log(updatedStatus);
      if (updatedStatus.length > 0) {
        latestStatus = updatedStatus[0].status;
      }
    }
  }

  const statusLabel =
    OrderStatusMap[Number(latestStatus)] || "不明なステータス";

  return (
    <>
      {order !== undefined && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">注文詳細: {params.id}</h1>
          <Card>
            <CardHeader>
              <CardTitle>注文情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>商品:</strong> {order.orderCreateds[0].productName}
              </p>
              <p>
                <strong>数量:</strong> {order.orderCreateds[0].quantity} kg
              </p>
              <p>
                <strong>価格:</strong> {order.orderCreateds[0].price} ETH
              </p>
              <p>
                <strong>配送手数料割合:</strong>{" "}
                {order.orderCreateds[0].shippingFee}
              </p>
              <p>
                <strong>状態:</strong> {statusLabel}
              </p>
              <div>
                <h3 className="font-semibold mb-2">QRコード</h3>
                <Image
                  src="/placeholder.svg"
                  alt="QRコード"
                  width={200}
                  height={200}
                />
                <Button className="mt-2">QRコードをダウンロード</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
