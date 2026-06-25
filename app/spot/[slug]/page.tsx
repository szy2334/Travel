import { ArrowLeft, Calendar, Clock, MapPin, Route, Ticket } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiGuidePanel } from "@/components/AiGuidePanel";
import { Logo } from "@/components/Logo";
import { VideoSection } from "@/components/VideoSection";
import { getSpotBySlug, getVideosBySpot, provinces, scenicSpots } from "@/lib/data";

export function generateStaticParams() {
  return scenicSpots.map((spot) => ({ slug: spot.slug }));
}

export default async function SpotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);
  if (!spot) notFound();

  const province = provinces.find((item) => item.name === spot.province);
  const videos = getVideosBySpot(spot.id);

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1560px] items-center justify-between">
        <Logo />
        <Link
          href={province ? `/province/${province.slug}` : "/"}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2e6e56] transition hover:text-[#0d6f67]"
        >
          <ArrowLeft className="h-4 w-4" />
          返回省级地图
        </Link>
      </header>

      <section className="mx-auto mt-8 grid max-w-[1560px] gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div>
          <div className="overflow-hidden rounded-[8px] border border-[#2f7e56]/25 bg-[#fff8df]/72 shadow-[0_20px_60px_rgba(45,92,70,0.14)]">
            <div
              className="relative min-h-[480px] bg-cover bg-center p-6 md:p-10"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(255,248,223,.94), rgba(255,248,223,.62) 50%, rgba(255,248,223,.18)), url(${spot.images[0]})`
              }}
            >
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2f7e56]/25 bg-[#fff8df]/85 px-4 py-2 text-sm font-bold text-[#0d6f67]">
                  <MapPin className="h-4 w-4" />
                  {spot.province} · {spot.city}
                </div>
                <h1 className="mt-6 font-serif text-5xl leading-tight text-balance text-[#173d33] md:text-7xl">
                  {spot.name}
                </h1>
                <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-[#3d695c]">{spot.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {spot.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#86cbbf]/35 px-4 py-2 text-xs font-bold text-[#0d6f67]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="paper-panel rounded-[8px] p-6">
              <h2 className="font-serif text-3xl text-[#173d33]">基础信息</h2>

              <dl className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { icon: Ticket, label: "门票参考", value: spot.ticketPrice },
                  { icon: Clock, label: "开放时间", value: spot.openingHours },
                  { icon: Calendar, label: "最佳季节", value: spot.bestSeason },
                  { icon: Route, label: "推荐时长", value: spot.duration }
                ].map((item) => (
                  <div key={item.label} className="min-w-0 rounded-[8px] border border-[#2f7e56]/20 bg-[#fffdf0]/80 p-3 lg:p-4">
                    <item.icon className="h-5 w-5 text-[#e75f50]" />
                    <dt className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#0d6f67]">{item.label}</dt>
                    <dd className="mt-1 text-sm font-semibold leading-6 text-[#173d33]">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <dl className="mt-5 grid gap-4 text-sm text-[#3d695c] md:grid-cols-2">
                <div className="rounded-[8px] border border-[#2f7e56]/20 bg-[#fffdf0]/80 p-4">
                  <dt className="font-bold text-[#e75f50]">景区类型</dt>
                  <dd className="mt-1">{spot.category}</dd>
                </div>
                <div className="rounded-[8px] border border-[#2f7e56]/20 bg-[#fffdf0]/80 p-4">
                  <dt className="font-bold text-[#e75f50]">交通方式</dt>
                  <dd className="mt-1 leading-7">{spot.transportation}</dd>
                </div>
              </dl>
            </div>
            <div className="paper-panel rounded-[8px] p-6">
              <h2 className="font-serif text-3xl text-[#173d33]">注意事项</h2>
              <ul className="mt-4 space-y-3 text-sm font-medium leading-6 text-[#527466]">
                {spot.tips.map((tip) => (
                  <li key={tip}>- {tip}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0d6f67]">Video Aggregation</p>
              <h2 className="mt-1 font-serif text-3xl text-[#173d33]">视频内容聚合</h2>
            </div>
            <VideoSection fallbackVideos={videos} spotId={spot.id} />
          </section>
        </div>

        <AiGuidePanel spot={spot} />
      </section>
    </main>
  );
}
