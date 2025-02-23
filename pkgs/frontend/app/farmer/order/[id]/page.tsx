import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function OrderDetails({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">注文詳細: {params.id}</h1>
      <Card>
        <CardHeader>
          <CardTitle>注文情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>商品:</strong> 有機リンゴ
          </p>
          <p>
            <strong>数量:</strong> 100 kg
          </p>
          <p>
            <strong>価格:</strong> ¥20,000
          </p>
          <p>
            <strong>配送料:</strong> ¥5,000
          </p>
          <p>
            <strong>状態:</strong> 作成済み
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
  );
}
