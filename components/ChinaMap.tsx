"use client";

import { useRouter } from "next/navigation";
import { MapCanvas } from "./MapCanvas";
import { chinaGeoJson, getChinaPointData, provinceMapData } from "@/lib/maps";

export function ChinaMap() {
  const router = useRouter();
  const selectedNames = provinceMapData.map((province) => province.name);

  return (
    <MapCanvas
      mapName="china-5a"
      geoJson={chinaGeoJson}
      mapData={provinceMapData}
      pointData={getChinaPointData()}
      selectedNames={selectedNames}
      mapZoom={1.12}
      layoutSize="112%"
      layoutCenter={["50%", "57%"]}
      className="translate-y-10 md:translate-y-14"
      showPointLabels={false}
      showRegionLabels={false}
      heightClass="h-[74vh] min-h-[640px] max-h-[900px]"
      onRegionClick={(slug) => router.push(`/province/${slug}`)}
      onPointClick={(slug) => router.push(`/province/${slug}`)}
    />
  );
}
