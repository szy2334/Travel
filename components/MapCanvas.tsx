"use client";

import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import { useEffect, useMemo, useRef, useState } from "react";

type MapCanvasProps = {
  mapName: string;
  geoJson: object;
  mapData: Array<Record<string, unknown>>;
  pointData?: Array<Record<string, unknown>>;
  heightClass?: string;
  selectedNames?: string[];
  mapZoom?: number;
  layoutSize?: string;
  layoutCenter?: [string, string];
  className?: string;
  showPointLabels?: boolean;
  showRegionLabels?: boolean;
  onRegionClick?: (slug: string) => void;
  onPointClick?: (slug: string) => void;
};

export function MapCanvas({
  mapName,
  geoJson,
  mapData,
  pointData = [],
  heightClass = "h-[540px]",
  selectedNames = [],
  mapZoom = 1.05,
  layoutSize = "96%",
  layoutCenter = ["50%", "50%"],
  className = "",
  showPointLabels = true,
  showRegionLabels = true,
  onRegionClick,
  onPointClick
}: MapCanvasProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const optionRef = useRef<EChartsOption | null>(null);
  const onRegionClickRef = useRef(onRegionClick);
  const onPointClickRef = useRef(onPointClick);
  const [compact, setCompact] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    onRegionClickRef.current = onRegionClick;
    onPointClickRef.current = onPointClick;
  }, [onPointClick, onRegionClick]);

  const option = useMemo<EChartsOption>(() => {
    const regions = selectedNames.map((name) => ({
      name,
      itemStyle: {
        areaColor: "#0d6f67",
        borderColor: "#fff1c7",
        borderWidth: 1.2
      },
      label: {
        color: "#fff8df",
        fontWeight: 800
      }
    }));

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        borderWidth: 1,
        borderColor: "rgba(13, 111, 103, 0.2)",
        backgroundColor: "rgba(255, 248, 223, 0.96)",
        textStyle: { color: "#173d33" },
        extraCssText: "box-shadow: 0 16px 36px rgba(45,92,70,.16); border-radius: 8px;",
        formatter: (params: any) => {
          if (Array.isArray(params.value)) {
            return `<strong>${params.name}</strong><br/>${params.data?.city ?? ""} · ${params.data?.category ?? ""}`;
          }
          const count = params.value ? `${params.value}处5A景区` : "点击探索";
          return `<strong>${params.name}</strong><br/>${count}`;
        }
      },
      geo: {
        map: mapName,
        roam: true,
        zoom: mapZoom,
        scaleLimit: { min: 0.9, max: 5 },
        layoutCenter,
        layoutSize,
        itemStyle: {
          areaColor: "#fff1c7",
          borderColor: "rgba(13, 111, 103, 0.45)",
          borderWidth: 0.9
        },
        emphasis: {
          itemStyle: {
            areaColor: "#f07f5f",
            borderColor: "#fff1c7",
            borderWidth: 1.8
          },
          label: {
            color: "#173d33",
            fontWeight: 800
          }
        },
        label: {
          show: showRegionLabels && !compact,
          color: "rgba(23, 61, 51, 0.7)",
          fontSize: 11,
          fontWeight: 600
        },
        regions
      },
      series: [
        {
          type: "map",
          map: mapName,
          geoIndex: 0,
          data: mapData,
          selectedMode: false
        },
        {
          name: "5A景区",
          type: "scatter",
          coordinateSystem: "geo",
          symbol: "circle",
          symbolSize: (value: number[]) => Math.max(7, Math.min(11, 6 + Math.sqrt(Number(value[2]) || 1) * 0.8)),
          itemStyle: {
            color: "#e75f50",
            borderColor: "#fff8df",
            borderWidth: 1.5
          },
          label: {
            show: showPointLabels && !compact,
            formatter: "{b}",
            position: "right",
            color: "#173d33",
            fontSize: 12,
            fontWeight: 800
          },
          labelLayout: {
            hideOverlap: true,
            moveOverlap: "shiftY"
          },
          emphasis: {
            scale: 1.25,
            label: { show: true }
          },
          data: pointData
        }
      ]
    };
  }, [compact, layoutCenter, layoutSize, mapData, mapName, mapZoom, pointData, selectedNames, showPointLabels, showRegionLabels]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.width < 540);
      chartRef.current?.resize();
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    echarts.registerMap(mapName, geoJson as never);
    const container = ref.current;
    if (!container) return;

    let disposed = false;
    const timers: number[] = [];

    const initChart = () => {
      if (disposed || !ref.current) return;

      const target = ref.current;
      const rect = target.getBoundingClientRect();
      const width = Math.max(320, Math.round(rect.width || target.clientWidth || 960));
      const height = Math.max(360, Math.round(rect.height || target.clientHeight || 620));

      echarts.getInstanceByDom(target)?.dispose();

      const chart = echarts.init(target, undefined, {
        height,
        renderer: "svg",
        width
      });

      chartRef.current = chart;
      if (optionRef.current) chart.setOption(optionRef.current, true);
      setMounted(true);

      const handleChartClick = (params: any) => {
        const dataSlug = params.data?.slug;
        if (params.seriesType === "scatter" && dataSlug && onPointClickRef.current) {
          onPointClickRef.current(dataSlug);
          return;
        }
        const regionSlug = params.data?.slug || params.event?.target?.data?.slug;
        if (regionSlug && onRegionClickRef.current) onRegionClickRef.current(regionSlug);
      };

      chart.on("click", handleChartClick);
      requestAnimationFrame(() => chart.resize());
      [80, 240, 600, 1200].forEach((delay) => {
        timers.push(window.setTimeout(() => chart.resize(), delay));
      });
    };

    timers.push(window.setTimeout(initChart, 0));

    const handleWindowResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      disposed = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", handleWindowResize);
      chartRef.current?.dispose();
      chartRef.current = null;
      setMounted(false);
    };
  }, [geoJson, mapName]);

  useEffect(() => {
    optionRef.current = option;
    chartRef.current?.setOption(option, true);
  }, [option]);

  return (
    <div ref={ref} className={`relative w-full ${heightClass} ${className}`} aria-label={`${mapName}地图`}>
      {!mounted ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#0d6f67]/70">
          地图加载中
        </div>
      ) : null}
    </div>
  );
}
