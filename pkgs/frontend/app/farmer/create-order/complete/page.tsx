<<<<<<< HEAD
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
=======
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
>>>>>>> b6e7d1d (leafletを追加し、注文完了ページと地図コンポーネントを実装)

export default function OrderComplete({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-center">注文が完了しました</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              注文ID: {searchParams.orderId}
            </p>
            <p className="mt-2 text-muted-foreground">
              注文の詳細はダッシュボードから確認できます
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Button asChild>
              <Link href={`/farmer/order/${searchParams.orderId}`}>
                注文詳細を確認
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/farmer/dashboard">ダッシュボードに戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
