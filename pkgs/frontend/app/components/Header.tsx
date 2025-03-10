import { Name } from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
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
            <Wallet>
              <ConnectWallet className="bg-blue-800">
                <Name />
              </ConnectWallet>
              <WalletDropdown className="bg-blue-800">
                <WalletDropdownLink
                  href="/farmer/dashboard"
                  className="hover:bg-blue-200"
                >
                  農家ダッシュボード
                </WalletDropdownLink>
                <WalletDropdownLink
                  href="/buyer/dashboard"
                  className="hover:bg-blue-200"
                >
                  購入者ダッシュボード
                </WalletDropdownLink>
                <WalletDropdownLink
                  href="/delivery/dashboard"
                  className="hover:bg-blue-200"
                >
                  配送業者ダッシュボード
                </WalletDropdownLink>
                <WalletDropdownDisconnect className="hover:bg-blue-200" />
              </WalletDropdown>
            </Wallet>
          </div>
        </nav>
      </div>
    </header>
  );
}
