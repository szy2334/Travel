import { ArrowRight, MapPin, Route, Sparkles } from "lucide-react";
import Link from "next/link";
import { ChinaMap } from "@/components/ChinaMap";
import { Logo } from "@/components/Logo";
import { getProvinceBySlug, provinces, scenicSpots } from "@/lib/data";
import { getDailyFeaturedSpots, getTodayDisplayLabel } from "@/lib/recommendations";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const featured = getDailyFeaturedSpots(scenicSpots);
  const todayLabel = getTodayDisplayLabel();
  const featuredProvince = provinces.find((province) => province.name === featured[0]?.province) ?? getProvinceBySlug("sichuan")!;

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1560px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#2e6e56] md:flex">
          <Link href="/" className="text-[#173d33]">
            首页
          </Link>
          <a href="#map" className="transition hover:text-[#0d6f67]">
            5A地图
          </a>
          <a href="#featured" className="transition hover:text-[#0d6f67]">
            今日推荐
          </a>
        </nav>
      </header>

      <section className="mx-auto mt-8 max-w-[1560px]">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#409b6e]/30 bg-[#fff8df]/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#0d6f67]">
              <Sparkles className="h-4 w-4" />
              Interactive Scenic Map
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-[#173d33] md:text-7xl">
              中国5A景区探索
            </h1>
          </div>
          <p className="max-w-xl text-sm font-medium leading-7 text-[#3d695c] md:text-right">
            从真实行政区地图进入五个省区，浏览5A景区点位、相关视频与定制旅行攻略。
          </p>
        </div>

        <section id="map" className="map-shell rounded-[8px] p-2 shadow-[0_22px_70px_rgba(45,92,70,0.16)] lg:p-3">
          <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-[#0d6f67]/20 bg-[#fff8df]/80 px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#0d6f67]">
            点击已收录省区进入
          </div>
          <div className="map-layer">
            <ChinaMap />
          </div>
        </section>
      </section>

      <section id="featured" className="mx-auto mt-10 max-w-[1560px] pb-14">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#0d6f67]">
              <Route className="h-4 w-4" />
              Today · {todayLabel}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#173d33]">当日景点推荐</h2>
          </div>
          <Link
            href={`/province/${featuredProvince.slug}`}
            className="hidden items-center gap-2 rounded-full bg-[#173d33] px-5 py-3 text-sm font-semibold text-[#fff8df] transition hover:bg-[#0d6f67] md:inline-flex"
          >
            查看{featuredProvince.name}地图
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((spot) => (
            <Link
              key={spot.id}
              href={`/spot/${spot.slug}`}
              className="rounded-[8px] border border-[#2f7e56]/25 bg-[#fff8df]/72 p-5 shadow-[0_14px_38px_rgba(45,92,70,0.1)] transition hover:-translate-y-1 hover:border-[#0d6f67]/45 hover:bg-[#fff8df]"
            >
              <p className="flex items-center gap-1 text-xs font-bold text-[#e75f50]">
                <MapPin className="h-3.5 w-3.5" />
                {spot.province} · {spot.city}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-[#173d33]">{spot.name}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#527466]">{spot.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {spot.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full bg-[#86cbbf]/35 px-3 py-1 text-xs font-semibold text-[#0d6f67]">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
