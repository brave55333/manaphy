"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ブロックチェーン物流
          </Link>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <div
            className={`md:flex md:space-x-4 ${isMenuOpen ? "block" : "hidden"} absolute md:static top-16 left-0 right-0 bg-primary md:bg-transparent p-4 md:p-0`}
          >
            <Button
              variant="ghost"
              asChild
              className="w-full md:w-auto mb-2 md:mb-0"
            >
              <Link href="/farmer/dashboard">農家</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="w-full md:w-auto mb-2 md:mb-0"
            >
              <Link href="/buyer/dashboard">購入者</Link>
            </Button>
            <Button variant="ghost" asChild className="w-full md:w-auto">
              <Link href="/delivery/dashboard">配送業者</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
