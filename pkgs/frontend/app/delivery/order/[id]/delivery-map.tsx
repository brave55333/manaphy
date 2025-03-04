"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DeliveryMapProps {
  pickupCoordinates: [number, number];
  deliveryCoordinates: [number, number];
  currentCoordinates: [number, number] | null;
}

export default function DeliveryMap({
  pickupCoordinates,
  deliveryCoordinates,
  currentCoordinates,
}: DeliveryMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Leafletのデフォルトアイコンパスの問題を修正
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    if (!mapRef.current) {
      // マップの初期化
      mapRef.current = L.map("delivery-map");

      // OpenStreetMapのタイルレイヤーを追加
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // カスタムアイコンの作成
      const pickupIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const deliveryIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const currentIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: #22c55e; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      // マーカーの追加
      const pickupMarker = L.marker(pickupCoordinates, { icon: pickupIcon })
        .addTo(mapRef.current)
        .bindPopup("集荷場所");

      const deliveryMarker = L.marker(deliveryCoordinates, {
        icon: deliveryIcon,
      })
        .addTo(mapRef.current)
        .bindPopup("配送先");

      // 現在位置のマーカー（存在する場合）
      if (currentCoordinates) {
        const currentMarker = L.marker(currentCoordinates, {
          icon: currentIcon,
        })
          .addTo(mapRef.current)
          .bindPopup("現在位置");
      }

      // ルートラインの描画
      const routePoints = [pickupCoordinates];

      if (currentCoordinates) {
        routePoints.push(currentCoordinates);
      }

      routePoints.push(deliveryCoordinates);

      const routeLine = L.polyline(routePoints, {
        color: "#6366f1",
        weight: 4,
        opacity: 0.7,
        dashArray: "10, 10",
        lineCap: "round",
      }).addTo(mapRef.current);

      // 全てのマーカーが見えるようにビューを調整
      const bounds = L.latLngBounds(routePoints);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    // クリーンアップ
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [pickupCoordinates, deliveryCoordinates, currentCoordinates]);

  return <div id="delivery-map" className="h-full w-full" />;
}
