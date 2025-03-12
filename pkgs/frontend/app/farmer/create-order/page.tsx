"use client";

import type React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { AlertTriangle, Info, Loader2, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

// Leafletマップをクライアントサイドのみでロード
const LocationMap = dynamic(() => import("./location-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-muted/50 rounded-lg flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
});

interface FormData {
  productName: string;
  quantity: number;
  price: number;
  shippingFee: number;
  location: {
    latitude: number | null;
    longitude: number | null;
    address: string;
  };
}

export default function CreateOrder() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    quantity: 0,
    price: 0,
    shippingFee: 0,
    location: {
      latitude: null,
      longitude: null,
      address: "",
    },
  });

  const { address } = useAccount();

  const { createOrder } = useCreateOrder();

  // 位置情報取得関数を改善
  const handleGetLocation = () => {
    setIsGettingLocation(true);
    setError(null);
    setWarning(null);

    // 開発環境での注意事項
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const isHttps = window.location.protocol === "https:";

    if (isLocalhost && !isHttps) {
      setWarning(
        "開発環境ではHTTPSでない場合、位置情報が取得できない場合があります。本番環境ではHTTPSで実行してください。",
      );
    }

    // 高精度の位置情報を取得するためのオプション
    const options = {
      enableHighAccuracy: true, // 高精度モードを有効化
      timeout: 10000, // タイムアウトを10秒に設定
      maximumAge: 0, // キャッシュされた位置情報を使用しない
    };

    if (!navigator.geolocation) {
      setError("お使いのブラウザは位置情報をサポートしていません");
      setIsGettingLocation(false);
      return;
    }

    // 位置情報の取得を開始
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          console.log("位置情報取得成功:", position.coords);

          // 精度情報を取得
          const accuracy = position.coords.accuracy;

          // 逆ジオコーディングを使用して住所を取得
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&accept-language=ja`,
          );

          if (!response.ok) {
            throw new Error("住所の取得に失敗しました");
          }

          const data = await response.json();

          setFormData((prev) => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: data.display_name || "",
            },
          }));

          // 成功メッセージをコンソールに表示
          console.log("位置情報取得完了", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: `${accuracy}m`,
            address: data.display_name,
          });
        } catch (error) {
          console.error("住所の取得に失敗しました:", error);
          // 住所の取得に失敗しても、位置情報は設定
          setFormData((prev) => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: "",
            },
          }));
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("位置情報の取得に失敗:", error);

        // エラーコードに基づいたメッセージ
        let errorMessage = "位置情報の取得に失敗しました";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "位置情報へのアクセスが拒否されました。ブラウザの設定で位置情報へのアクセスを許可してください。";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage =
              "位置情報が利用できません。電波状況をご確認ください。";
            break;
          case error.TIMEOUT:
            errorMessage =
              "位置情報の取得がタイムアウトしました。再度お試しください。";
            break;
        }

        setError(errorMessage);
        setIsGettingLocation(false);
      },
      options,
    );
  };

  // 手動で位置情報を入力する機能
  const handleManualLocationInput = () => {
    // 東京駅の座標を初期値として設定
    setFormData((prev) => ({
      ...prev,
      location: {
        latitude: 35.681236,
        longitude: 139.767125,
        address: "東京都千代田区丸の内1丁目",
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // バリデーション
      if (!formData.productName) {
        throw new Error("商品名を入力してください");
      }
      if (formData.quantity <= 0) {
        throw new Error("数量は0より大きい値を入力してください");
      }
      if (formData.price <= 0) {
        throw new Error("価格は0より大きい値を入力してください");
      }
      if (formData.shippingFee < 0) {
        throw new Error("配送料は0以上の値を入力してください");
      }
      if (!formData.location.latitude || !formData.location.longitude) {
        throw new Error("集荷場所を設定してください");
      }

      // ここで注文データを保存するAPIを呼び出す
      createOrder({
        destinationX: BigInt(10),
        destinationY: BigInt(20),
        productName: "商品名",
        quantity: BigInt(5),
        price: BigInt(100),
        shippingFee: BigInt(10),
        recipients: [
          "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
          "0x1295BDc0C102EB105dC0198fdC193588fe66A1e4",
        ],
        allocations: [BigInt(50), BigInt(50)],
        owner: address as `0x${string}`,
        creator: address as `0x${string}`,
        tokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      });

      // 完了ページへリダイレクト
      router.push(`/farmer/create-order/complete?orderId=${123}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "注文の作成に失敗しました");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "productName" ? value : Number(value),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">新規注文作成</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {warning && (
        <Alert
          variant="warning"
          className="mb-6 bg-yellow-50 border-yellow-200"
        >
          <Info className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">注意</AlertTitle>
          <AlertDescription className="text-yellow-700">
            {warning}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="productName">商品名</Label>
          <Input
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="商品名を入力"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">数量</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="数量を入力"
            min="1"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">価格</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="価格を入力"
            min="1"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shippingFee">配送料</Label>
          <Input
            id="shippingFee"
            name="shippingFee"
            type="number"
            value={formData.shippingFee}
            onChange={handleChange}
            placeholder="配送料を入力"
            min="0"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label>集荷場所</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            <Button
              type="button"
              onClick={handleGetLocation}
              disabled={isGettingLocation || isSubmitting}
              variant="outline"
              className="flex-none"
            >
              {isGettingLocation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  取得中...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  現在地を取得
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleManualLocationInput}
              disabled={isSubmitting}
              variant="secondary"
              className="flex-none"
            >
              テスト用位置情報を設定
            </Button>
          </div>

          <div className="text-sm text-muted-foreground mb-2">
            <p>
              ※
              位置情報の取得には、ブラウザの位置情報へのアクセス許可が必要です。
            </p>
            <p>
              ※ HTTPSでの実行が必要です。開発環境では動作しない場合があります。
            </p>
          </div>

          {formData.location.latitude && formData.location.longitude && (
            <div className="flex-1 text-sm text-muted-foreground mb-2">
              緯度: {formData.location.latitude.toFixed(6)}, 経度:{" "}
              {formData.location.longitude.toFixed(6)}
            </div>
          )}

          {/* 地図の表示 */}
          {formData.location.latitude && formData.location.longitude ? (
            <div className="mt-2">
              <LocationMap
                latitude={formData.location.latitude}
                longitude={formData.location.longitude}
              />
              <p className="text-xs text-muted-foreground mt-1">
                ※
                青い円は位置の精度を示しています。実際の位置はこの円内のどこかです。
              </p>
            </div>
          ) : (
            <div className="bg-muted/30 h-[100px] rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                「現在地を取得」ボタンをクリックして位置情報を取得してください
              </p>
            </div>
          )}

          {formData.location.address && (
            <div className="mt-2 text-sm">
              <Label>住所</Label>
              <p className="mt-1 text-muted-foreground">
                {formData.location.address}
              </p>
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              処理中...
            </>
          ) : (
            "注文を作成"
          )}
        </Button>
      </form>
    </div>
  );
}
