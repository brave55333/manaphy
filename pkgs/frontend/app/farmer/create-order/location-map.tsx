"use client";

<<<<<<< HEAD
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Map, Marker, Circle } from "leaflet";
=======
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
>>>>>>> b6e7d1d (leafletを追加し、注文完了ページと地図コンポーネントを実装)

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

export default function LocationMap({ latitude, longitude }: LocationMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    // Leafletのデフォルトアイコンパスの問題を修正
<<<<<<< HEAD
=======
    delete L.Icon.Default.prototype._getIconUrl;
>>>>>>> b6e7d1d (leafletを追加し、注文完了ページと地図コンポーネントを実装)
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    // マップの初期化
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([latitude, longitude], 16);

      // OpenStreetMapのタイルレイヤーを追加
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // マーカーの追加
      markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);

      // 精度を示す円を追加（仮の半径50m）
      circleRef.current = L.circle([latitude, longitude], {
        radius: 50,
        color: "#3b82f6",
        fillColor: "#3b82f6",
        fillOpacity: 0.2,
      }).addTo(mapRef.current);
    } else {
      // マップとマーカーの位置を更新
      mapRef.current.setView([latitude, longitude], 16);
      markerRef.current?.setLatLng([latitude, longitude]);
      circleRef.current?.setLatLng([latitude, longitude]);
    }

    // クリーンアップ
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
        circleRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return <div id="map" className="h-[300px] rounded-lg" />;
}
