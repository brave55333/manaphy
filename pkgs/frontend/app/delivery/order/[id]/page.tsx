import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeliveryOrderDetails({
  params,
}: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        配送状況詳細: 注文 {params.id}
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>注文情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>商品名:</strong> 有機リンゴ
          </p>
          <p>
            <strong>数量:</strong> 100 kg
          </p>
          <p>
            <strong>配送先住所:</strong> 東京都渋谷区...
          </p>
          <p>
            <strong>現在の状態:</strong> 配送中
          </p>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>配送履歴</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>2023/06/01 10:00 - 集荷完了</li>
            <li>2023/06/01 14:30 - 配送センター到着</li>
            <li>2023/06/02 08:00 - 配送開始</li>
          </ul>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/delivery/dashboard">ダッシュボードに戻る</Link>
        </Button>
        <Button>配送完了を報告</Button>
      </div>
    </div>
  );
}
