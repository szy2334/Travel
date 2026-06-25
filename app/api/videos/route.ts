import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getVideosBySpot, scenicSpots } from "@/lib/data";
import type { Video } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "youtube-videos.json");

type CachedVideos = Record<string, { fetchedAt: number; videos: Video[] }>;

type YouTubeSearchResponse = {
  items?: Array<{
    id?: { videoId?: string };
    snippet?: {
      channelTitle?: string;
      publishedAt?: string;
      thumbnails?: {
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
      title?: string;
    };
  }>;
};

async function readCache(): Promise<CachedVideos> {
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf8")) as CachedVideos;
  } catch {
    return {};
  }
}

async function writeCache(cache: CachedVideos) {
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

function isFresh(timestamp: number) {
  return Date.now() - timestamp < CACHE_TTL_MS;
}

function buildQuery(spot: (typeof scenicSpots)[number]) {
  return `${spot.name} ${spot.city} ${spot.province} China travel guide scenic area`;
}

async function searchYouTubeVideos(spot: (typeof scenicSpots)[number]): Promise<Video[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    key: apiKey,
    maxResults: "6",
    part: "snippet",
    q: buildQuery(spot),
    type: "video"
  });

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`, {
    cache: "no-store"
  });

  if (!response.ok) return [];

  const data = (await response.json()) as YouTubeSearchResponse;

  return (data.items ?? [])
    .flatMap((item) => {
      const videoId = item.id?.videoId;
      const snippet = item.snippet;
      const thumbnail = snippet?.thumbnails?.high?.url ?? snippet?.thumbnails?.medium?.url ?? snippet?.thumbnails?.default?.url;

      if (!videoId || !snippet?.title || !thumbnail) return [];

      const video: Video = {
        id: `youtube-${videoId}`,
        scenicSpotId: spot.id,
        platform: "YouTube",
        title: snippet.title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail,
        type: "相关视频",
        author: snippet.channelTitle,
        publishedAt: snippet.publishedAt
      };

      return [video];
    });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const spotId = searchParams.get("spotId");

  if (!spotId) {
    return NextResponse.json({ error: "Missing spotId" }, { status: 400 });
  }

  const spot = scenicSpots.find((item) => item.id === spotId);
  if (!spot) {
    return NextResponse.json({ error: "Unknown spotId" }, { status: 404 });
  }

  const fallbackVideos = getVideosBySpot(spot.id);
  const cache = await readCache();
  const cached = cache[spot.id];

  if (cached && isFresh(cached.fetchedAt) && cached.videos.length) {
    return NextResponse.json({ source: "cache", videos: cached.videos });
  }

  try {
    const videos = await searchYouTubeVideos(spot);
    if (videos.length) {
      cache[spot.id] = { fetchedAt: Date.now(), videos };
      await writeCache(cache);
      return NextResponse.json({ source: "youtube", videos });
    }
  } catch {
    // Fall through to the local mock videos.
  }

  return NextResponse.json({ source: "mock", videos: fallbackVideos });
}
