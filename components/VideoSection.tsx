"use client";

import { useEffect, useState } from "react";
import { VideoGallery } from "@/components/VideoGallery";
import type { Video } from "@/lib/types";

type VideoSectionProps = {
  fallbackVideos: Video[];
  spotId: string;
};

export function VideoSection({ fallbackVideos, spotId }: VideoSectionProps) {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos);

  useEffect(() => {
    let ignore = false;

    async function loadVideos() {
      try {
        const response = await fetch(`/api/videos?spotId=${encodeURIComponent(spotId)}`);
        if (!response.ok) return;

        const data = (await response.json()) as { videos?: Video[] };
        if (!ignore && data.videos?.length) {
          setVideos(data.videos);
        }
      } catch {
        // Keep the static mock videos when the live provider is unavailable.
      }
    }

    loadVideos();

    return () => {
      ignore = true;
    };
  }, [spotId]);

  return <VideoGallery videos={videos} />;
}
