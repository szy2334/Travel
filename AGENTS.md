# China 5A Scenic Explorer 项目上下文

本文档用于帮助新的 Codex 对话快速读懂项目背景，尤其适合后续生成“项目书、答辩材料、产品说明书、商业计划书、技术文档”等内容。

当前代码目录：`D:\SZY\Travel`

## 项目一句话介绍

China 5A Scenic Explorer（中国5A级景区探索）是一个以中国真实行政区地图为核心入口的智能旅游网站，整合 5A 景区数据、地图浏览、相关视频推荐和 AI 旅行助手，为用户提供景区发现、内容参考和个性化攻略生成体验。

## 当前项目状态

项目已经完成第一版可运行 MVP，并经过多轮功能与视觉优化。

当前不是早期静态原型，而是一个 Next.js 全栈项目：

- 首页可展示真实中国行政区地图。
- 已收录广东、四川、江苏、广西、新疆 5 个省级区域。
- 已整理 89 个国家 5A 景区数据。
- 支持从首页点击省份进入省级景区地图。
- 支持在省级页面搜索和筛选景区。
- 支持进入景区详情页查看基础信息、注意事项、相关视频和旅行助手。
- 视频推荐已接入 YouTube Data API，并保留 mock fallback。
- 旅行助手已接入阿里云百炼 / 通义千问兼容接口，并保留 mock fallback。
- 页面风格已从深墨绿色三栏布局改为浅色、现代、地图主视觉布局。

## 已收录数据范围

| 省级区域 | 已收录 5A 景区数量 | 说明 |
| --- | ---: | --- |
| 广东省 | 16 | 已完善 |
| 四川省 | 18 | 已完善 |
| 江苏省 | 26 | 已完善 |
| 广西壮族自治区 | 11 | 已新增 |
| 新疆维吾尔自治区 | 18 | 已新增 |
| 合计 | 89 | 当前 MVP 数据范围 |

数据主要位于：

- `lib/data.ts`
- `lib/additional-data.ts`
- `lib/types.ts`

地图 GeoJSON 位于：

- `public/maps/china.json`
- `public/maps/guangdong.json`
- `public/maps/sichuan.json`
- `public/maps/jiangsu.json`
- `public/maps/guangxi.json`
- `public/maps/xinjiang.json`

## 核心功能

### 1. 首页中国地图导航

首页以中国真实行政区地图作为核心视觉入口。

当前交互特点：

- 已收录省份使用深青色高亮。
- 未收录省份使用浅黄色。
- 鼠标悬停省份时变为红色。
- 点击已收录省份进入对应省级页面。
- 地图使用 Apache ECharts 与真实 GeoJSON。
- 为兼容 Chrome，地图渲染方式使用 SVG renderer。
- 首页不再保留旧版左侧智能搜索栏和右侧推荐列表。
- 省份数量卡片已删除。
- 当日景点推荐放在地图下方。

首页当前视觉方向：

- 浅色现代风格。
- 页面背景为淡米色纸感网格。
- 地图容器为浅绿色边框。
- 地图底色为柔和蓝绿色。
- 地图左下角保留较淡的 `CHINA 5A MAP` 装饰文字。
- 整体参考用户提供的 Behance 地图风格，但已适配中国地图。

相关文件：

- `app/page.tsx`
- `components/ChinaMap.tsx`
- `components/MapCanvas.tsx`
- `app/globals.css`

### 2. 省级景区地图

用户点击首页省份后进入省级页面。

省级页功能：

- 展示该省真实行政区 / 市级 GeoJSON 地图。
- 地图上用点位展示该省 5A 景区。
- 支持按景区名称、城市、标签搜索。
- 支持按主题筛选。
- 点击景区点位或列表入口进入详情页。

设计约束：

- 省级页地图必须占主体空间。
- 不要重新添加右侧推荐景区卡片，用户明确觉得拥挤。
- 景区点位默认不要显示密集文字标签，避免重叠。
- 景区名称可通过 hover tooltip 或详情页查看。

相关文件：

- `app/province/[slug]/page.tsx`
- `components/ProvinceExplorer.tsx`
- `components/MapCanvas.tsx`

### 3. 景区详情页

景区详情页展示：

- 景区名称
- 所在省份与城市
- 景区介绍
- 门票参考
- 开放时间
- 最佳季节
- 推荐游玩时长
- 景区类型
- 交通方式
- 注意事项
- 相关视频推荐
- 旅行助手

设计约束：

- 不展示经纬度。
- 基础信息优先来自本地数据，不由 AI 编造。
- 注意事项单独成块。
- 视频模块只保留标题和视频卡片，不添加冗长解释文案。
- “AI旅行助手”已经改名为“旅行助手”。
- 旅行助手不再列固定攻略类型按钮，用户在文本框中自然描述需求。

相关文件：

- `app/spot/[slug]/page.tsx`
- `components/VideoSection.tsx`
- `components/VideoGallery.tsx`
- `components/AiGuidePanel.tsx`

## 视频推荐功能

当前已接入 YouTube Data API。

接口：

- `GET /api/videos?spotId=...`

实现逻辑：

- 用户进入具体景点详情页时才触发视频搜索。
- 首页和省级地图页不触发 YouTube 搜索，节省额度。
- 后端根据景区名、城市、省份生成搜索关键词。
- 调用 YouTube Data API `search.list`。
- 只搜索 `type=video`。
- 返回标题、封面、作者、外链等信息。
- 如果没有 API key、API 报错、额度不足或无结果，则返回 mock 视频。

缓存：

- 缓存位置：`D:\SZY\Travel\.cache\youtube-videos.json`
- 缓存时长：24 小时。
- 同一景点 24 小时内重复打开详情页时直接读缓存，不消耗 YouTube quota。
- `.cache/` 已加入 `.gitignore`。

环境变量：

```env
YOUTUBE_API_KEY=你的_YouTube_API_Key
```

相关文件：

- `app/api/videos/route.ts`
- `components/VideoSection.tsx`
- `components/VideoGallery.tsx`

## 旅行助手功能

当前旅行助手已接入阿里云百炼 / 通义千问兼容接口。

接口：

- `POST /api/generate-guide`

实现逻辑：

- 前端提交景区基础信息和用户偏好。
- 后端调用大模型生成旅行攻略。
- 如果没有配置 API key、接口报错或模型不可用，则返回 mock 攻略。
- 前端会显示生成结果来源状态。

支持的环境变量名称：

```env
DASHSCOPE_API_KEY=你的_阿里云百炼_API_Key
BAILIAN_API_KEY=可选
ALIYUN_BAILIAN_API_KEY=可选
QWEN_API_KEY=可选
BAILIAN_MODEL=qwen-plus
```

注意：

- 不要把真实 API key 写进代码。
- `.env.local` 用于本地配置，已加入 `.gitignore`。
- 生成攻略时，基础景区信息来自本地数据，AI 只负责组织攻略和建议。

相关文件：

- `app/api/generate-guide/route.ts`
- `components/AiGuidePanel.tsx`

## 技术架构

前端：

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- lucide-react

地图：

- Apache ECharts
- GeoJSON 行政区数据
- SVG renderer

后端：

- Next.js App Router API Routes
- 本地文件缓存
- 外部 API 代理调用

数据：

- 当前为本地 TypeScript mock / seed 数据。
- 后续可迁移到 PostgreSQL / Supabase。

外部能力：

- YouTube Data API：相关视频推荐。
- 阿里云百炼 / 通义千问：旅行攻略生成。

## 主要页面路径

- 首页：`/`
- 省级页：`/province/[slug]`
- 景区详情页：`/spot/[slug]`

示例：

- `/province/jiangsu`
- `/province/guangdong`
- `/province/sichuan`
- `/province/guangxi`
- `/province/xinjiang`
- `/spot/suzhou-gardens`

## 本地运行方式

系统 PATH 中的 Node 版本较旧，不能直接运行当前 Next.js 项目。

推荐先临时设置 PATH，使用 Codex 自带 Node：

```powershell
$env:PATH='C:\Users\SZY\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
```

启动开发服务器：

```powershell
node .\node_modules\next\dist\bin\next dev -p 3000
```

打开：

```text
http://localhost:3000
```

如果遇到 Turbopack 内部错误，优先使用上面的 `node .\node_modules\next\dist\bin\next dev -p 3000` 方式启动。

## 常用验证命令

```powershell
node .\node_modules\typescript\bin\tsc --noEmit
node .\node_modules\eslint\bin\eslint.js .
```

## 环境变量文件

本地使用：

- `.env.local`

示例文件：

- `.env.example`

不要提交：

- `.env.local`
- `.cache/`

## 写项目书时应强调的亮点

如果新的对话要帮用户生成项目书，建议重点突出：

1. 项目以真实中国行政区地图作为旅游信息入口，交互直观。
2. 已覆盖 5 个省级区域、89 个 5A 景区，具备可扩展数据模型。
3. 支持“首页地图 - 省级地图 - 景区详情 - 视频 - 旅行助手”的完整用户流程。
4. 相关视频通过 YouTube Data API 获取，并设计了本地缓存和 mock fallback。
5. 旅行助手接入阿里云百炼 / 通义千问，可按用户偏好生成个性化攻略。
6. 前后端统一使用 Next.js App Router，部署路径相对清晰。
7. 当前 MVP 已可本地运行，后续可扩展 Supabase、用户系统、收藏、天气、路线规划等能力。
8. 视觉上已经从工具型后台感改为更轻、更现代的地图探索体验。

## 项目书建议结构

可以按以下结构生成：

1. 项目背景与意义
2. 项目目标
3. 用户需求分析
4. 核心功能设计
5. 系统架构设计
6. 数据模型设计
7. 外部 API 接入方案
8. 页面与交互设计
9. 技术路线
10. 创新点与特色
11. 可行性分析
12. 运行与测试情况
13. 后续优化计划
14. 总结

## 后续可扩展方向

- 补齐全国所有 5A 景区。
- 将本地数据迁移到 Supabase / PostgreSQL。
- 增加用户登录、收藏、历史记录。
- 增加天气、交通、路线规划。
- 增加攻略分享和导出功能。
- 接入国内视频平台开放接口。
- 优化移动端体验。
- 正式部署到 Vercel 或其他云服务。

## 开发注意事项

- 不要恢复手绘占位地图，当前地图已经替换为真实 GeoJSON。
- 不要恢复首页旧版三栏布局。
- 不要恢复首页省份数量卡片。
- 不要在省级页重新添加右侧推荐景区卡片。
- 详情页不要展示经纬度。
- 视频模块不要添加冗长解释文案。
- 旅行助手不要再列固定攻略类型按钮。
- API key 只能通过 `.env.local` 配置，不要写入代码或文档正文。
- 修改视觉时优先保证地图清楚、信息不挤、层级自然。
