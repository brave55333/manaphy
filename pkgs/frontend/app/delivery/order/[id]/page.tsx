"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  MapPin,
  User,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import dynamic from "next/dynamic";

// Leafletマップをクライアントサイドのみでロード
const DeliveryMap = dynamic(() => import("./delivery-map"), {
  ssr: false,
});

// 配送状況のステータス
type DeliveryStatus =
  | "pending"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed";

// 配送履歴のエントリ
interface DeliveryHistoryEntry {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

// 配送情報のインターフェース
interface DeliveryInfo {
  id: string;
  status: DeliveryStatus;
  product: string;
  quantity: string;
  pickupAddress: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  estimatedDelivery: string;
  pickupCoordinates: [number, number];
  deliveryCoordinates: [number, number];
  currentCoordinates: [number, number] | null;
  history: DeliveryHistoryEntry[];
}

// モックデータ
const getMockDeliveryInfo = (id: string): DeliveryInfo => {
  return {
    id,
    status: "in_transit",
    product: "有機リンゴ",
    quantity: "100kg",
    pickupAddress: "東京都千代田区丸の内1-1-1",
    deliveryAddress: "東京都新宿区西新宿2-8-1",
    customerName: "山田太郎",
    customerPhone: "090-1234-5678",
    estimatedDelivery: "2023年5月15日 14:00-16:00",
    pickupCoordinates: [35.681236, 139.767125], // 東京駅
    deliveryCoordinates: [35.689487, 139.691711], // 新宿駅
    currentCoordinates: [35.685175, 139.729714], // 途中地点
    history: [
      {
        timestamp: "2023-05-14 09:15",
        status: "注文受付",
        location: "システム",
        description: "注文が作成され、配送業者に割り当てられました",
      },
      {
        timestamp: "2023-05-14 10:30",
        status: "集荷準備中",
        location: "東京都千代田区",
        description: "配送業者が集荷場所に向かっています",
      },
      {
        timestamp: "2023-05-14 11:45",
        status: "集荷完了",
        location: "東京都千代田区丸の内1-1-1",
        description: "商品の集荷が完了しました",
      },
      {
        timestamp: "2023-05-14 12:30",
        status: "配送中",
        location: "東京都中央区",
        description: "配送先に向けて移動中です",
      },
    ],
  };
};

export default function DeliveryOrderDetails({
  params,
}: { params: { id: string } }) {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>(
    getMockDeliveryInfo(params.id),
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // 配送完了処理
  const handleCompleteDelivery = async () => {
    setIsUpdating(true);

    // 実際のアプリケーションではAPIを呼び出す
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 状態を更新
    setDeliveryInfo((prev) => ({
      ...prev,
      status: "delivered",
      currentCoordinates: prev.deliveryCoordinates,
      history: [
        ...prev.history,
        {
          timestamp: new Date().toLocaleString(),
          status: "配送完了",
          location: prev.deliveryAddress,
          description: "商品が配送先に届けられました",
        },
      ],
    }));

    setIsUpdating(false);
  };

  // 配送失敗処理
  const handleFailedDelivery = async () => {
    setIsUpdating(true);

    // 実際のアプリケーションではAPIを呼び出す
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 状態を更新
    setDeliveryInfo((prev) => ({
      ...prev,
      status: "failed",
      history: [
        ...prev.history,
        {
          timestamp: new Date().toLocaleString(),
          status: "配送失敗",
          location: prev.currentCoordinates
            ? `緯度: ${prev.currentCoordinates[0]}, 経度: ${prev.currentCoordinates[1]}`
            : "不明",
          description: "配送先に届けることができませんでした",
        },
      ],
    }));

    setIsUpdating(false);
  };

  // 配送状況に応じたバッジの色とテキスト
  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            集荷待ち
          </Badge>
        );
      case "picked_up":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            集荷済み
          </Badge>
        );
      case "in_transit":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            配送中
          </Badge>
        );
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            配送完了
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            配送失敗
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">配送詳細: {params.id}</h1>
          <p className="text-muted-foreground mt-1">
            {deliveryInfo.product} ({deliveryInfo.quantity})
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          {getStatusBadge(deliveryInfo.status)}
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="details">配送情報</TabsTrigger>
          <TabsTrigger value="map">配送ルート</TabsTrigger>
          <TabsTrigger value="history">配送履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>集荷情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">集荷場所</p>
                    <p className="text-muted-foreground">
                      {deliveryInfo.pickupAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">商品情報</p>
                    <p className="text-muted-foreground">
                      {deliveryInfo.product} ({deliveryInfo.quantity})
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>配送先情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">配送先住所</p>
                    <p className="text-muted-foreground">
                      {deliveryInfo.deliveryAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">受取人</p>
                    <p className="text-muted-foreground">
                      {deliveryInfo.customerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">連絡先</p>
                    <p className="text-muted-foreground">
                      {deliveryInfo.customerPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">配送予定時間</p>
                    <p className="text-muted-foreground">
                      {deliveryInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>配送アクション</CardTitle>
              <CardDescription>
                配送状況を更新するには、以下のアクションを実行してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {deliveryInfo.status === "in_transit" && (
                  <>
                    <Button
                      onClick={handleCompleteDelivery}
                      disabled={isUpdating}
                      className="flex items-center"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      配送完了
                    </Button>
                    <Button
                      onClick={handleFailedDelivery}
                      variant="outline"
                      disabled={isUpdating}
                      className="flex items-center"
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      配送失敗
                    </Button>
                  </>
                )}
                {deliveryInfo.status === "delivered" && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    配送が完了しました
                  </div>
                )}
                {deliveryInfo.status === "failed" && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    配送に失敗しました
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="outline" asChild className="w-full">
                <Link href="/delivery/dashboard">ダッシュボードに戻る</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>配送ルート</CardTitle>
              <CardDescription>
                集荷場所から配送先までのルートと現在位置
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full rounded-md overflow-hidden">
                <DeliveryMap
                  pickupCoordinates={deliveryInfo.pickupCoordinates}
                  deliveryCoordinates={deliveryInfo.deliveryCoordinates}
                  currentCoordinates={deliveryInfo.currentCoordinates}
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm">
                <div className="flex items-center mb-2 sm:mb-0">
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <span>集荷場所: {deliveryInfo.pickupAddress}</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  <span>配送先: {deliveryInfo.deliveryAddress}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>配送履歴</CardTitle>
              <CardDescription>配送の進行状況と履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deliveryInfo.history.map((entry, index) => (
                  <div key={index} className="relative pl-6 pb-6">
                    {/* タイムラインの縦線 */}
                    {index < deliveryInfo.history.length - 1 && (
                      <div className="absolute left-[0.4375rem] top-3 bottom-0 w-0.5 bg-muted"></div>
                    )}
                    {/* ステータスドット */}
                    <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary"></div>

                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <p className="font-medium">{entry.status}</p>
                        <p className="text-muted-foreground text-sm">
                          {entry.description}
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">
                          {entry.location}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 sm:mt-0 sm:ml-4">
                        {entry.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
