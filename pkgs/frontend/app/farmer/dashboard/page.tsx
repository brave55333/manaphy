import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FarmerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">農家ダッシュボード</h1>
        <Button asChild>
          <Link href="/farmer/create-order">新規注文作成</Link>
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
          <TableRow>
            <TableCell>001</TableCell>
            <TableCell>有機リンゴ</TableCell>
            <TableCell>作成済み</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href="/farmer/order/001">詳細を見る</Link>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>002</TableCell>
            <TableCell>新鮮トマト</TableCell>
            <TableCell>配送中</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href="/farmer/order/002">詳細を見る</Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
