"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { BrowserQRCodeReader } from "@zxing/library";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Camera, XCircle, FlipHorizontal } from "lucide-react";

export default function ScanQRCode() {
  const webcamRef = useRef<Webcam | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  // モバイルデバイスの検出
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 利用可能なカメラデバイスの取得
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setDevices(videoDevices);
      } catch (err) {
        console.error("カメラデバイスの取得に失敗しました:", err);
      }
    };
    getDevices();
  }, []);

  // QRコードのスキャン処理
  const scanQRCode = useCallback(async () => {
    if (!webcamRef.current) return;

    const video = webcamRef.current.video;
    if (!video) return;

    const codeReader = new BrowserQRCodeReader();

    try {
      const result = await codeReader.decodeFromVideoElement(video);
      if (result?.text) {
        // バイブレーション（モバイルデバイスのみ）
        if (isMobile && navigator.vibrate) {
          navigator.vibrate(200);
        }
        // 成功音の再生
        const audio = new Audio("/success-sound.mp3"); // 必要に応じて適切な音声ファイルを用意
        audio.play().catch(() => {
          /* 音声再生エラーを無視 */
        });

        setScannedData(result.text);
        setIsScanning(false);
      }
    } catch (err) {
      // スキャン中のエラーは無視（継続的なスキャンのため）
    }
  }, [isMobile]);

  // フレームごとの処理
  useEffect(() => {
    let animationFrame: number;

    const capture = async () => {
      if (!isScanning || !webcamRef.current) return;

      await scanQRCode();
      animationFrame = requestAnimationFrame(capture);
    };

    if (isScanning) {
      capture();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isScanning, scanQRCode]);

  const handleStartScan = () => {
    setError(null);
    setScannedData(null);
    setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleSwitchCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleConfirmDelivery = async () => {
    // ここで配送確認のAPIを呼び出す
    console.log("配送確認:", scannedData);
  };

  const videoConstraints = {
    width: isMobile ? window.innerWidth : 720,
    height: isMobile ? window.innerWidth : 720,
    facingMode: facingMode,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">QRコードスキャン</h1>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>QRコードスキャナー</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {isScanning ? (
              <div className="relative aspect-square">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="absolute inset-0 w-full h-full object-cover"
                  onUserMediaError={(err) => {
                    setError("カメラへのアクセスに失敗しました。");
                    setIsScanning(false);
                  }}
                />
                {/* スキャンエリアのオーバーレイ */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-2/3 aspect-square">
                    {/* スキャンエリアの角を表示 */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />
                    {/* スキャンラインのアニメーション */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/50 animate-scan" />
                  </div>
                </div>
              </div>
            ) : scannedData ? (
              <div className="p-4 text-center">
                <p className="text-xl mb-4">スキャン結果:</p>
                <p className="font-mono bg-gray-200 p-2 rounded break-all">
                  {scannedData}
                </p>
              </div>
            ) : (
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Camera className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                  <p>「スキャン開始」をクリックしてカメラを起動してください</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {isScanning ? (
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={handleStopScan}
                  className="flex-1"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  停止
                </Button>
                {devices.length > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleSwitchCamera}
                    className="flex-none"
                  >
                    <FlipHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : (
              <Button
                onClick={handleStartScan}
                className="w-full"
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    スキャン中...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    スキャン開始
                  </>
                )}
              </Button>
            )}

            {scannedData && (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleConfirmDelivery}
              >
                集荷/配達を確認
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
