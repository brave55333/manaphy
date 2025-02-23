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

export default function DeliveryDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">配送業者ダッシュボード</h1>
      <Table className="mb-8">
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
            <TableCell>集荷済み</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href="/delivery/order/001">詳細を見る</Link>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>002</TableCell>
            <TableCell>新鮮トマト</TableCell>
            <TableCell>配送中</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href="/delivery/order/002">詳細を見る</Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/delivery/scan">QRコードをスキャン</Link>
        </Button>
      </div>
    </div>
  );
}
