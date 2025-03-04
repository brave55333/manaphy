import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ブロックチェーン物流
          </Link>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/farmer/dashboard">農家</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/buyer/dashboard">購入者</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/delivery/dashboard">配送業者</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
