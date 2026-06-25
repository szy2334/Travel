"use client";

import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/data";
import type { Province, ScenicSpot } from "@/lib/types";
import { getProvinceGeoJson, getProvincePointData } from "@/lib/maps";
import { MapCanvas } from "./MapCanvas";

type ProvinceExplorerProps = {
  province: Province;
  spots: ScenicSpot[];
};

export function ProvinceExplorer({ province, spots }: ProvinceExplorerProps) {
  const router = useRouter();
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const geoJson = getProvinceGeoJson(province.slug);

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      const categoryMatch = category === "全部" || spot.tags.includes(category) || spot.category === category;
      const queryMatch =
        !query ||
        spot.name.includes(query) ||
        spot.city.includes(query) ||
        spot.category.includes(query) ||
        spot.tags.some((tag) => tag.includes(query));
      return categoryMatch && queryMatch;
    });
  }, [category, query, spots]);

  const pointData = getProvincePointData(province.slug).filter((point) =>
    filteredSpots.some((spot) => spot.slug === point.slug)
  );

  return (
    <section className="space-y-4">
      <div className="paper-panel rounded-[8px] p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#2f7e56]/25 bg-[#fff8df] px-4 py-3 md:max-w-[420px]">
            <Search className="h-4 w-4 shrink-0 text-[#0d6f67]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索景区、城市或标签"
              className="w-full bg-transparent text-sm font-medium text-[#173d33] outline-none placeholder:text-[#6b8b7e]"
            />
          </div>

          <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="mr-1 inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0d6f67]">
              <Filter className="h-4 w-4" />
              筛选
            </span>
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                  category === item
                    ? "border-[#0d6f67] bg-[#0d6f67] text-[#fff8df]"
                    : "border-[#2f7e56]/25 bg-[#fff8df]/72 text-[#2e6e56] hover:border-[#0d6f67]/55"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="map-shell rounded-[8px] p-3 lg:p-5">
        {geoJson ? (
          <div className="map-layer">
            <MapCanvas
              mapName={`province-${province.slug}`}
              geoJson={geoJson}
              mapData={[]}
              pointData={pointData}
              selectedNames={[]}
              mapZoom={1}
              layoutSize="96%"
              showPointLabels={false}
              heightClass="h-[72vh] min-h-[580px] xl:h-[720px]"
              onPointClick={(slug) => router.push(`/spot/${slug}`)}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
