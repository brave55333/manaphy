import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateOrder() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">新規注文作成</h1>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product-name">商品名</Label>
          <Input id="product-name" placeholder="商品名を入力" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">数量</Label>
          <Input id="quantity" type="number" placeholder="数量を入力" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">価格</Label>
          <Input id="price" type="number" placeholder="価格を入力" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping-fee">配送料</Label>
          <Input id="shipping-fee" type="number" placeholder="配送料を入力" />
        </div>
        <Button type="submit">注文を作成</Button>
      </form>
    </div>
  );
}
