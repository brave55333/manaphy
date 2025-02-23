import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentPage({ params }: { params: { id: string } }) {
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
            <Button type="submit">支払いを確定</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
