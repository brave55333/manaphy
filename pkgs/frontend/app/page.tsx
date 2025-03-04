import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-8">
        ブロックチェーン物流へようこそ
      </h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/farmer/dashboard">農家ダッシュボード</Link>
        </Button>
        <Button asChild>
          <Link href="/buyer/dashboard">購入者ダッシュボード</Link>
        </Button>
        <Button asChild>
          <Link href="/delivery/dashboard">配送業者ダッシュボード</Link>
        </Button>
      </div>
    </div>
  );
}
