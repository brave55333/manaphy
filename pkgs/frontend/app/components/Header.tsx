import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Header component
 * @returns
 */
export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ブロックチェーン物流
          </Link>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
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
        </nav>
      </div>
    </header>
  );
}
