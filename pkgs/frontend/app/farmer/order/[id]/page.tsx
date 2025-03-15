"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderQuery } from "@/graphql";
import { OrderStatusMap } from "@/lib/types";
import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useQuery } from "urql";

/**
 * OrderDetails Component
 */
export default function OrderDetails({ params }: { params: { id: string } }) {
  console.log("params", params.id);
  //get All Orders info
  const [result] = useQuery({
    query: getOrderQuery,
    variables: { orderId: Number(params.id) },
  });
  const { data: order } = result;

  //@ts-ignore
  let latestStatus: string = "-1";

  if (order !== undefined) {
    const updatedStatus = order.orderStatusChangeds;
    if (updatedStatus !== undefined) {
      console.log(updatedStatus);
      if (updatedStatus.length > 0) {
        latestStatus = updatedStatus[0].status;
      }
    }
  }

  const statusLabel =
    OrderStatusMap[Number(latestStatus)] || "不明なステータス";

  // QRコードに含めるデータ
  let qrCodeData = JSON.stringify({
    orderId: params.id,
    product: "不明な商品",
    quantity: 0,
    timestamp: new Date().toISOString(),
  });

  if (order !== undefined) {
    qrCodeData = JSON.stringify({
      orderId: params.id,
      product: order.orderCreateds[0].productName || "不明な商品",
      quantity: order.orderCreateds[0].quantity || 0,
      timestamp: new Date().toISOString(),
    });
  }

  // QRコードをダウンロードする関数
  const handleDownloadQR = () => {
    const svg = document.getElementById("order-qrcode");
    if (!svg) return;

    // SVGをデータURLに変換
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      // ダウンロードリンクを作成
      const downloadLink = document.createElement("a");
      downloadLink.download = `order-${params.id}-qrcode.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  return (
    <>
      {order !== undefined && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">注文詳細: {params.id}</h1>
          <Card>
            <CardHeader>
              <CardTitle>注文情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>商品:</strong> {order.orderCreateds[0].productName}
              </p>
              <p>
                <strong>数量:</strong> {order.orderCreateds[0].quantity} kg
              </p>
              <p>
                <strong>価格:</strong> {order.orderCreateds[0].price} ETH
              </p>
              <p>
                <strong>配送手数料割合:</strong>{" "}
                {order.orderCreateds[0].shippingFee}
              </p>
              <p>
                <strong>状態:</strong> {statusLabel}
              </p>
              <div>
                <h3 className="font-semibold mb-2">QRコード</h3>
                <div className="bg-white p-4 inline-block rounded-md">
                  <QRCodeSVG
                    id="order-qrcode"
                    value={qrCodeData}
                    size={200}
                    level="H" // 高い誤り訂正レベル
                    includeMargin={true}
                  />
                </div>
                <Button
                  className="mt-4 flex items-center"
                  onClick={handleDownloadQR}
                >
                  <Download className="mr-2 h-4 w-4" />
                  QRコードをダウンロード
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
