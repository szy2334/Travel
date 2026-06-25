import type { ScenicSpot } from "./types";

const SHANGHAI_OFFSET_MS = 8 * 60 * 60 * 1000;

export function getChinaDateKey(date = new Date()) {
  return new Date(date.getTime() + SHANGHAI_OFFSET_MS).toISOString().slice(0, 10);
}

export function getTodayDisplayLabel(date = new Date()) {
  const [, month, day] = getChinaDateKey(date).split("-");
  return `${Number(month)}月${Number(day)}日`;
}

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getDailyFeaturedSpots(spots: ScenicSpot[], count = 4, date = new Date()) {
  const dateKey = getChinaDateKey(date);
  const ranked = spots
    .map((spot, index) => ({
      spot,
      score: hashText(`${dateKey}:${spot.id}:${spot.slug}:${index}`)
    }))
    .sort((a, b) => a.score - b.score)
    .map((item) => item.spot);

  const selected: ScenicSpot[] = [];
  const selectedIds = new Set<string>();
  const usedProvinces = new Set<string>();
  const usedCategories = new Set<string>();

  const addSpot = (spot: ScenicSpot) => {
    if (selectedIds.has(spot.id) || selected.length >= count) return;
    selected.push(spot);
    selectedIds.add(spot.id);
    usedProvinces.add(spot.province);
    usedCategories.add(spot.category);
  };

  ranked.forEach((spot) => {
    if (!usedProvinces.has(spot.province)) addSpot(spot);
  });

  ranked.forEach((spot) => {
    if (!usedCategories.has(spot.category)) addSpot(spot);
  });

  ranked.forEach(addSpot);

  return selected;
}
