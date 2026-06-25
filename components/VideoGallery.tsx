import { Play } from "lucide-react";
import type { Video } from "@/lib/types";

export function VideoGallery({ videos }: { videos: Video[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {videos.map((video) => (
        <a
          key={video.id}
          href={video.url}
          rel={video.url === "#" ? undefined : "noreferrer"}
          target={video.url === "#" ? undefined : "_blank"}
          className="group overflow-hidden rounded-[8px] border border-[#2f7e56]/25 bg-[#fff8df]/72 shadow-[0_14px_38px_rgba(45,92,70,0.1)] transition hover:-translate-y-1 hover:border-[#0d6f67]/45"
        >
          <div
            className="relative h-48 bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(rgba(255,248,223,.08), rgba(23,61,51,.42)), url(${video.thumbnail})` }}
          >
            <span className="absolute left-4 top-4 rounded-full bg-[#fff8df]/90 px-3 py-1 text-xs font-bold text-[#0d6f67]">
              {video.platform}
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#fff8df]/80 bg-[#fff8df]/70 text-[#e75f50] backdrop-blur transition group-hover:scale-105">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
          </div>
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#e75f50]">{video.type}</p>
            <h3 className="mt-2 font-serif text-xl text-[#173d33]">{video.title}</h3>
            {video.author ? <p className="mt-2 text-xs font-medium text-[#6b8b7e]">{video.author}</p> : null}
          </div>
        </a>
      ))}
    </section>
  );
}
