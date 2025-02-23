"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function ScanQRCode() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const router = useRouter();

  const handleScan = (data: string | null) => {
    if (data) {
      setScannedData(data);
      setIsScannerActive(false);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleConfirm = () => {
    if (scannedData) {
      // ここで実際のデータ処理や状態更新を行います
      console.log("配送確認:", scannedData);
      // 例: 配送状況の詳細ページに遷移
      router.push(`/delivery/order/${scannedData}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">QRコードスキャン</h1>
      <Card>
        <CardHeader>
          <CardTitle>QRコードスキャナー</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isScannerActive ? (
            <div className="w-full max-w-sm mx-auto">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
            </div>
          ) : (
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              {scannedData ? (
                <p className="text-xl">スキャン結果: {scannedData}</p>
              ) : (
                <p>カメラが起動していません</p>
              )}
            </div>
          )}
          <Button
            onClick={() => setIsScannerActive(!isScannerActive)}
            className="w-full"
          >
            {isScannerActive ? "スキャンを停止" : "スキャンを開始"}
          </Button>
          {scannedData && (
            <Button
              onClick={handleConfirm}
              variant="outline"
              className="w-full"
            >
              集荷/配達を確認
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
