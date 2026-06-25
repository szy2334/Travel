import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ProvinceExplorer } from "@/components/ProvinceExplorer";
import { getProvinceBySlug, getSpotsByProvince, provinces } from "@/lib/data";

export function generateStaticParams() {
  return provinces.map((province) => ({ slug: province.slug }));
}

export default async function ProvincePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const province = getProvinceBySlug(slug);
  if (!province) notFound();

  const spots = getSpotsByProvince(province.name);

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-[1560px] items-center justify-between">
        <Logo />
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2e6e56] transition hover:text-[#0d6f67]">
          <ArrowLeft className="h-4 w-4" />
          返回全国地图
        </Link>
      </header>

      <section className="mx-auto mt-8 max-w-[1560px]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#409b6e]/30 bg-[#fff8df]/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0d6f67]">
              <MapPin className="h-4 w-4" />
              Province Map
            </p>
            <h1 className="mt-4 font-serif text-5xl text-[#173d33] md:text-6xl">{province.name}5A景区</h1>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[#527466]">{province.description}</p>
          </div>
          <div className="rounded-[8px] border border-[#2f7e56]/25 bg-[#fff8df]/72 px-5 py-4 text-right">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d6f67]">已收录</p>
            <p className="mt-1 font-serif text-4xl text-[#e75f50]">{spots.length}</p>
          </div>
        </div>

        <ProvinceExplorer province={province} spots={spots} />
      </section>
    </main>
  );
}
