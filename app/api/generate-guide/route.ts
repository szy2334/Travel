import { NextResponse } from "next/server";
import { getSpotBySlug, scenicSpots } from "@/lib/data";
import type { GuideRequest, GuideResponse, ScenicSpot } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type BailianChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const BAILIAN_ENDPOINT = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
const DEFAULT_MODEL = "qwen-plus";

function getBailianApiKey() {
  return (
    process.env.DASHSCOPE_API_KEY ??
    process.env.BAILIAN_API_KEY ??
    process.env.ALIYUN_BAILIAN_API_KEY ??
    process.env.QWEN_API_KEY
  );
}

function getBailianModel() {
  return process.env.BAILIAN_MODEL ?? process.env.DASHSCOPE_MODEL ?? DEFAULT_MODEL;
}

function buildMockGuide(body: GuideRequest, spot: ScenicSpot): GuideResponse {
  return {
    title: `${spot.name}定制旅行攻略`,
    summary: `按${body.budget || "适中预算"}规划，重点兼顾${body.preferences || "经典景观与轻松动线"}。最佳季节为${body.season || spot.bestSeason}，建议提前确认门票预约、开放时间和核心交通。`,
    route: [
      `抵达${spot.city}后优先进入${spot.name}核心景观区，先完成最想看的代表性景点。`,
      "中段安排休息、简餐和补水，避开人流最密集的时段。",
      "下午沿推荐动线完成拍照点和轻量步行路线，减少重复折返。",
      "离开前预留返程交通时间，并在景区周边安排一餐当地特色。"
    ],
    packingList: ["身份证件", "预约凭证", "舒适步行鞋", "充电宝", "雨具", "防晒用品"],
    outfit: `${spot.bestSeason}出行建议采用分层穿搭，鞋底以防滑和长时间步行为优先。`,
    food: [`${spot.city}本地小吃`, "热汤类餐食", "便携能量补给"],
    nearby: ["城市博物馆", "老街区", "周边观景点"],
    tips: spot.tips,
    source: "mock"
  };
}

function buildPrompt(body: GuideRequest, spot: ScenicSpot) {
  return [
    "你是一个严谨的中国5A级景区旅行规划助手。",
    "请基于给定景区基础数据生成旅行攻略，不要编造门票、开放时间、经纬度或不存在的硬性事实。",
    "输出必须是可被 JSON.parse 解析的 JSON，不要使用 Markdown，不要加代码块。",
    "JSON 字段必须完全符合：title:string, summary:string, route:string[], packingList:string[], outfit:string, food:string[], nearby:string[], tips:string[]。",
    "route 给 4 条以内，packingList 给 6 条以内，food 和 nearby 各给 3 条以内，tips 给 4 条以内。",
    "",
    "景区基础数据：",
    JSON.stringify(
      {
        name: spot.name,
        province: spot.province,
        city: spot.city,
        description: spot.description,
        ticketPrice: spot.ticketPrice,
        openingHours: spot.openingHours,
        bestSeason: spot.bestSeason,
        duration: spot.duration,
        category: spot.category,
        tags: spot.tags,
        transportation: spot.transportation,
        tips: spot.tips
      },
      null,
      2
    ),
    "",
    "用户需求：",
    JSON.stringify(
      {
        budget: body.budget,
        preferences: body.preferences,
        season: body.season,
        guideType: body.guideType
      },
      null,
      2
    )
  ].join("\n");
}

function normalizeGuideResponse(payload: Partial<GuideResponse>, fallback: GuideResponse): GuideResponse {
  return {
    title: typeof payload.title === "string" && payload.title ? payload.title : fallback.title,
    summary: typeof payload.summary === "string" && payload.summary ? payload.summary : fallback.summary,
    route: Array.isArray(payload.route) && payload.route.length ? payload.route.slice(0, 4) : fallback.route,
    packingList:
      Array.isArray(payload.packingList) && payload.packingList.length ? payload.packingList.slice(0, 6) : fallback.packingList,
    outfit: typeof payload.outfit === "string" && payload.outfit ? payload.outfit : fallback.outfit,
    food: Array.isArray(payload.food) && payload.food.length ? payload.food.slice(0, 3) : fallback.food,
    nearby: Array.isArray(payload.nearby) && payload.nearby.length ? payload.nearby.slice(0, 3) : fallback.nearby,
    tips: Array.isArray(payload.tips) && payload.tips.length ? payload.tips.slice(0, 4) : fallback.tips,
    source: payload.source === "mock" ? "mock" : payload.source === "bailian" ? "bailian" : fallback.source
  };
}

function parseGuideContent(content: string, fallback: GuideResponse): GuideResponse {
  const trimmed = content.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  return normalizeGuideResponse(JSON.parse(trimmed) as Partial<GuideResponse>, fallback);
}

async function generateWithBailian(body: GuideRequest, spot: ScenicSpot, fallback: GuideResponse): Promise<GuideResponse | null> {
  const apiKey = getBailianApiKey();
  if (!apiKey) return null;

  const response = await fetch(BAILIAN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: getBailianModel(),
      messages: [
        {
          role: "system",
          content: "你只输出结构化 JSON，用简洁中文帮助用户规划真实可执行的旅行攻略。"
        },
        {
          role: "user",
          content: buildPrompt(body, spot)
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    })
  });

  if (!response.ok) return null;

  const data = (await response.json()) as BailianChatResponse;
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  return { ...parseGuideContent(content, fallback), source: "bailian" };
}

export async function POST(request: Request) {
  const body = (await request.json()) as GuideRequest;
  const spot = scenicSpots.find((item) => item.id === body.scenicSpotId) ?? getSpotBySlug("jiuzhaigou")!;
  const fallback = buildMockGuide(body, spot);

  try {
    const guide = await generateWithBailian(body, spot, fallback);
    return NextResponse.json(guide ?? fallback);
  } catch {
    return NextResponse.json(fallback);
  }
}
