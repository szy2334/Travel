import { getSpotsByProvince, provinces, scenicSpots } from "./data";
import chinaGeoJson from "../public/maps/china.json";
import anhuiGeoJson from "../public/maps/anhui.json";
import beijingGeoJson from "../public/maps/beijing.json";
import chongqingGeoJson from "../public/maps/chongqing.json";
import gansuGeoJson from "../public/maps/gansu.json";
import guangdongGeoJson from "../public/maps/guangdong.json";
import guangxiGeoJson from "../public/maps/guangxi.json";
import guizhouGeoJson from "../public/maps/guizhou.json";
import fujianGeoJson from "../public/maps/fujian.json";
import hainanGeoJson from "../public/maps/hainan.json";
import hebeiGeoJson from "../public/maps/hebei.json";
import heilongjiangGeoJson from "../public/maps/heilongjiang.json";
import henanGeoJson from "../public/maps/henan.json";
import hubeiGeoJson from "../public/maps/hubei.json";
import hunanGeoJson from "../public/maps/hunan.json";
import innerMongoliaGeoJson from "../public/maps/inner-mongolia.json";
import jiangxiGeoJson from "../public/maps/jiangxi.json";
import jiangsuGeoJson from "../public/maps/jiangsu.json";
import jilinGeoJson from "../public/maps/jilin.json";
import liaoningGeoJson from "../public/maps/liaoning.json";
import ningxiaGeoJson from "../public/maps/ningxia.json";
import qinghaiGeoJson from "../public/maps/qinghai.json";
import shaanxiGeoJson from "../public/maps/shaanxi.json";
import shandongGeoJson from "../public/maps/shandong.json";
import shanghaiGeoJson from "../public/maps/shanghai.json";
import shanxiGeoJson from "../public/maps/shanxi.json";
import sichuanGeoJson from "../public/maps/sichuan.json";
import tianjinGeoJson from "../public/maps/tianjin.json";
import tibetGeoJson from "../public/maps/tibet.json";
import xinjiangGeoJson from "../public/maps/xinjiang.json";
import yunnanGeoJson from "../public/maps/yunnan.json";
import zhejiangGeoJson from "../public/maps/zhejiang.json";

const provinceRegions: Record<string, object> = {
  anhui: anhuiGeoJson,
  beijing: beijingGeoJson,
  chongqing: chongqingGeoJson,
  fujian: fujianGeoJson,
  gansu: gansuGeoJson,
  guangdong: guangdongGeoJson,
  guangxi: guangxiGeoJson,
  guizhou: guizhouGeoJson,
  hainan: hainanGeoJson,
  hebei: hebeiGeoJson,
  heilongjiang: heilongjiangGeoJson,
  henan: henanGeoJson,
  hubei: hubeiGeoJson,
  hunan: hunanGeoJson,
  "inner-mongolia": innerMongoliaGeoJson,
  jiangxi: jiangxiGeoJson,
  jiangsu: jiangsuGeoJson,
  jilin: jilinGeoJson,
  liaoning: liaoningGeoJson,
  ningxia: ningxiaGeoJson,
  qinghai: qinghaiGeoJson,
  shaanxi: shaanxiGeoJson,
  shandong: shandongGeoJson,
  shanghai: shanghaiGeoJson,
  shanxi: shanxiGeoJson,
  sichuan: sichuanGeoJson,
  tianjin: tianjinGeoJson,
  tibet: tibetGeoJson,
  xinjiang: xinjiangGeoJson,
  yunnan: yunnanGeoJson,
  zhejiang: zhejiangGeoJson
};

export { chinaGeoJson };

export function getProvinceGeoJson(slug: string) {
  return provinceRegions[slug];
}

export const provinceMapData = provinces.map((province) => ({
  name: province.mapName,
  value: province.scenicCount,
  slug: province.slug
}));

export function getProvincePointData(slug: string) {
  const province = provinces.find((item) => item.slug === slug);
  if (!province) return [];

  return getSpotsByProvince(province.name).map((spot) => ({
    name: spot.name,
    value: [spot.longitude, spot.latitude, 1],
    slug: spot.slug,
    city: spot.city,
    category: spot.category
  }));
}

export function getChinaPointData() {
  return provinces.map((province) => ({
    name: province.name,
    value: [...province.center, province.scenicCount],
    slug: province.slug,
    city: "已收录省份",
    category: `${province.scenicCount}处5A`
  }));
}

export function getSpotPoint(spotSlug: string) {
  const spot = scenicSpots.find((item) => item.slug === spotSlug);
  if (!spot) return [];
  return [
    {
      name: spot.name,
      value: [spot.longitude, spot.latitude, 1],
      slug: spot.slug,
      city: spot.city,
      category: spot.category
    }
  ];
}
