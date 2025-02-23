import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function BuyerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">購入者ダッシュボード</h1>
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
          <TableRow>
            <TableCell>001</TableCell>
            <TableCell>有機リンゴ</TableCell>
            <TableCell>支払い待ち</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href="/buyer/pay/001">今すぐ支払う</Link>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>002</TableCell>
            <TableCell>新鮮トマト</TableCell>
            <TableCell>配送中</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href="/buyer/order/002">詳細を見る</Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
