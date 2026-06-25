"use client";

import { Loader2, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import type { GuideResponse, ScenicSpot } from "@/lib/types";

export function AiGuidePanel({ spot }: { spot: ScenicSpot }) {
  const [budget, setBudget] = useState("800元/人");
  const [preferences, setPreferences] = useState("我们一行三人，打算在该景点附近游玩半天，想少走回头路，多拍照");
  const [guide, setGuide] = useState<GuideResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateGuide() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenicSpotId: spot.id,
          guideType: "定制攻略",
          budget,
          preferences,
          season: spot.bestSeason
        })
      });

      if (!response.ok) {
        throw new Error("Guide request failed");
      }

      const payload = (await response.json()) as GuideResponse;
      setGuide(payload);
    } catch {
      setError("暂时无法生成攻略，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="rounded-[8px] border border-[#2f7e56]/25 bg-[#fff8df]/72 p-5 shadow-[0_18px_50px_rgba(45,92,70,0.12)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#0d6f67] text-[#fff8df]">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-serif text-2xl text-[#173d33]">旅行助手</h2>
          <p className="text-xs font-medium text-[#6b8b7e]">基于景区数据生成定制攻略</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#0d6f67]">预算</label>
          <input
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="mt-2 w-full rounded-[8px] border border-[#2f7e56]/25 bg-[#fffdf0] px-3 py-3 text-sm font-medium text-[#173d33] outline-none focus:border-[#0d6f67]"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#0d6f67]">偏好与攻略类型</label>
          <textarea
            value={preferences}
            onChange={(event) => setPreferences(event.target.value)}
            rows={4}
            className="mt-2 w-full resize-none rounded-[8px] border border-[#2f7e56]/25 bg-[#fffdf0] px-3 py-3 text-sm font-medium text-[#173d33] outline-none focus:border-[#0d6f67]"
          />
        </div>
        <button
          onClick={generateGuide}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#173d33] px-4 py-3 text-sm font-bold text-[#fff8df] transition hover:bg-[#0d6f67] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "生成中" : "生成专属攻略"}
        </button>
        {error ? <p className="text-xs leading-5 text-[#c94a3e]">{error}</p> : null}
      </div>

      <div className="mt-5 rounded-[8px] border border-[#2f7e56]/20 bg-[#fffdf0]/80 p-4">
        {guide ? (
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-serif text-xl text-[#173d33]">{guide.title}</h3>
              {guide.source ? (
                <span className="shrink-0 rounded-full bg-[#86cbbf]/35 px-3 py-1 text-[11px] font-bold text-[#0d6f67]">
                  {guide.source === "bailian" ? "百炼生成" : "本地兜底"}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-[#527466]">{guide.summary}</p>
            <div className="mt-4 space-y-4 text-sm text-[#3d695c]">
              <section>
                <p className="font-bold text-[#e75f50]">路线</p>
                <ul className="mt-2 space-y-1">
                  {guide.route.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <p className="font-bold text-[#e75f50]">准备清单</p>
                <p className="mt-1">{guide.packingList.join(" / ")}</p>
              </section>
              <section>
                <p className="font-bold text-[#e75f50]">穿搭建议</p>
                <p className="mt-1">{guide.outfit}</p>
              </section>
              <section>
                <p className="font-bold text-[#e75f50]">美食与周边</p>
                <p className="mt-1">{[...guide.food, ...guide.nearby].join(" / ")}</p>
              </section>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-6 text-[#527466]">
            填写预算、同行人数、游玩时长和攻略偏好后，即可生成结构化出行建议。基础信息优先来自景区数据，路线与建议由旅行助手补全。
          </p>
        )}
      </div>
    </aside>
  );
}
