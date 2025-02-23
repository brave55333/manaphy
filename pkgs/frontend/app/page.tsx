import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        ブロックチェーン物流へようこそ
      </h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Button asChild className="w-full md:w-auto">
          <Link href="/farmer/dashboard">農家ダッシュボード</Link>
        </Button>
        <Button asChild className="w-full md:w-auto">
          <Link href="/buyer/dashboard">購入者ダッシュボード</Link>
        </Button>
        <Button asChild className="w-full md:w-auto">
          <Link href="/delivery/dashboard">配送業者ダッシュボード</Link>
        </Button>
      </div>
    </div>
  );
}
