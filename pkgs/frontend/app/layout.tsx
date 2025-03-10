"use client";

import { OnChainProviders } from "@/context/OnChainKitProvider";
import { BASE_GRAPHQL_URL } from "@/lib/utils";
import "@coinbase/onchainkit/styles.css";
import { Inter } from "next/font/google";
import type React from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Header } from "./components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata: Metadata = {
  title: "ブロックチェーン物流システム",
  description: "分散型物流管理システム",
};
*/

/**
 * Rayout Component
 * @param param0
 * @returns
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // create client instance for GraphQL
  const client = new Client({
    url: BASE_GRAPHQL_URL,
    exchanges: [cacheExchange, fetchExchange],
  });

  return (
    <html lang="ja">
      <body className={inter.className}>
        <Provider value={client}>
          <OnChainProviders>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </OnChainProviders>
        </Provider>
      </body>
    </html>
  );
}
