export type Province = {
  id: string;
  name: string;
  slug: string;
  mapName: string;
  scenicCount: number;
  center: [number, number];
  description: string;
};

export type ScenicSpot = {
  id: string;
  slug: string;
  name: string;
  province: string;
  city: string;
  latitude: number;
  longitude: number;
  description: string;
  ticketPrice: string;
  openingHours: string;
  bestSeason: string;
  duration: string;
  category: string;
  tags: string[];
  images: string[];
  transportation: string;
  tips: string[];
};

export type Video = {
  id: string;
  scenicSpotId: string;
  platform: string;
  title: string;
  url: string;
  thumbnail: string;
  type: string;
  author?: string;
  publishedAt?: string;
};

export type GuideRequest = {
  scenicSpotId: string;
  guideType: string;
  budget: string;
  preferences: string;
  season: string;
};

export type GuideResponse = {
  title: string;
  summary: string;
  route: string[];
  packingList: string[];
  outfit: string;
  food: string[];
  nearby: string[];
  tips: string[];
  source?: "bailian" | "mock";
};
