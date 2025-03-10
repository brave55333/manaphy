"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrdersQuery } from "@/graphql";
import { type AllOrders, Order } from "@/graphql/getAllOrders";
import { OrderStatusMap } from "@/lib/types";
import Link from "next/link";
import { useQuery } from "urql";

export default function DeliveryDashboard() {
  //get All Orders info
  const [result] = useQuery({
    query: getAllOrdersQuery,
  });
  const { data: allOrders } = result;

  console.log("allOrders", allOrders as AllOrders);

  return (
    <>
      {allOrders !== undefined && (
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">配送業者ダッシュボード</h1>
            <Button asChild>
              <Link href="/delivery/scan">QRコードをスキャン</Link>
            </Button>
          </header>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>注文ID</TableHead>
                <TableHead>商品名</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders.orderCreateds.map((order: Order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>
                    {OrderStatusMap[Number(order.status)] || "不明"}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/delivery/order/${order.orderId}`}>
                        詳細を見る
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
