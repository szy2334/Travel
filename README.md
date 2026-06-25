# China 5A Scenic Explorer

中国5A级景区智能探索平台。项目以真实中国行政区地图为入口，整合省区地图、5A 景区资料、视频推荐和旅行助手，帮助用户从地图浏览到景区详情，再生成个性化旅行攻略。

当前版本是一个可展示的 MVP 原型，重点已经从功能搭建转向视觉细化、数据扩展和部署准备。

## 当前状态

- 首页已经改为明亮、现代、地图主视觉布局。
- 中国地图使用真实 GeoJSON，已收录省区以深青色高亮，鼠标悬停为红色。
- 当前覆盖31个省区：广东、四川、江苏、广西壮族自治区、新疆维吾尔自治区等。
- 当前共收录169个 5A 景区。
- 省级页支持真实省级地图、景区点位、搜索和标签筛选。
- 景区详情页包含基础信息、注意事项、视频推荐和旅行助手。
- 视频推荐已接入 YouTube Data API，并保留 mock fallback。
- 旅行助手已接入阿里云百炼/通义千问兼容接口，并保留 mock fallback。

## 功能模块

### 首页地图

- 以中国真实行政区地图作为核心入口。
- 已收录省区高亮展示。
- 点击省区或点位进入对应省级页面。
- 地图框使用浅蓝色底色和轻量插画式地图风格。
- 首页下方保留当日景点推荐。

### 省级景区地图

- 支持广东、四川、江苏、广西、新疆等31个省区。
- 展示该省区内 5A 景区点位。
- 支持按景区名、城市、标签搜索。
- 支持自然风光、历史文化、古镇、主题乐园、博物馆、红色旅游等标签筛选。
- 点击景区点位或卡片进入景区详情页。

### 景区详情页

详情页展示：

- 景区名称、城市、省份和简介。
- 门票参考。
- 开放时间。
- 最佳季节。
- 推荐游玩时长。
- 景区类型。
- 交通方式。
- 注意事项。
- 相关视频推荐。
- 旅行助手生成攻略。


### 视频推荐

接口：`GET /api/videos?spotId=...`

实现方式：

- 用户进入具体景点详情页时才请求视频接口。
- 后端根据景区名、城市、省份生成 YouTube 搜索关键词。
- 配置 `YOUTUBE_API_KEY` 时调用 YouTube Data API。
- 无 API Key、接口报错或额度不足时返回 mock 视频。
- 视频结果会缓存 24 小时。
- 缓存路径：`D:\SZY\Travel\.cache\youtube-videos.json`。
- `.cache/` 已加入 `.gitignore`。

### 旅行助手

接口：`POST /api/generate-guide`

实现方式：

- 用户在详情页输入偏好、同行人数、游玩时间等自然语言需求。
- 配置百炼 API Key 时调用阿里云百炼/通义千问。
- 未配置 API Key 或接口失败时返回 mock 攻略。
- 前端会显示内容来源，便于区分真实生成和模拟返回。

## 技术栈

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Apache ECharts
- lucide-react
- Next.js App Router API Routes

## 目录结构

```text
app/
  api/
    generate-guide/route.ts   # 旅行助手接口
    videos/route.ts           # YouTube 视频推荐接口
  province/[slug]/page.tsx    # 省级地图页
  spot/[slug]/page.tsx        # 景区详情页
  page.tsx                    # 首页
components/
  AiGuidePanel.tsx            # 旅行助手面板
  ChinaMap.tsx                # 首页中国地图
  MapCanvas.tsx               # ECharts 地图通用组件
  ProvinceExplorer.tsx        # 省级地图与筛选
  VideoGallery.tsx            # 视频卡片展示
  VideoSection.tsx            # 视频加载容器
lib/
  data.ts                     # 基础省区和景区数据
  additional-data.ts          # 扩展景区数据
  maps.ts                     # 地图数据入口
  types.ts                    # 类型定义
public/maps/
  china.json                  # 中国地图 GeoJSON
  guangdong.json
  sichuan.json
  jiangsu.json
  guangxi.json
  xinjiang.json
```

## 环境变量

在项目根目录创建 `.env.local`：

```env
YOUTUBE_API_KEY=你的_YouTube_API_Key
DASHSCOPE_API_KEY=你的_阿里云百炼_API_Key
BAILIAN_MODEL=qwen-plus
```

说明：

- `.env.local` 已加入 `.gitignore`，不要提交到仓库。
- `YOUTUBE_API_KEY` 为空时，视频模块会使用 mock fallback。
- `DASHSCOPE_API_KEY` 为空时，旅行助手会使用 mock fallback。
- `BAILIAN_MODEL` 默认可使用 `qwen-plus`。

## 本地运行

当前电脑系统 PATH 里的 Node 版本较旧，建议使用 Codex 自带 Node。

PowerShell 中先临时设置 PATH：

```powershell
$env:PATH='C:\Users\SZY\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
```

安装依赖：

```powershell
npm install --ignore-scripts
```

启动开发服务器：

```powershell
node .\node_modules\next\dist\bin\next dev -p 3000
```

浏览器打开：

```text
http://localhost:3000
```

如果 Turbopack 出现异常，可以尝试关闭当前终端后重新启动开发服务器。

## 验证命令

```powershell
$env:PATH='C:\Users\SZY\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
node .\node_modules\typescript\bin\tsc --noEmit
node .\node_modules\eslint\bin\eslint.js .
```

也可以使用 package scripts：

```powershell
npm run typecheck
npm run lint
```

## 当前数据覆盖

| 省区 | Slug | 已收录景区数 |
| --- | --- | ---: |
| 广东 | `guangdong` | 16 |
| 四川 | `sichuan` | 18 |
| 江苏 | `jiangsu` | 26 |
| 广西壮族自治区 | `guangxi` | 11 |
| 新疆维吾尔自治区 | `xinjiang` | 18 |
等等
合计：169个 5A 景区。

## 已知注意事项

- 当前数据仍然是本地 mock 数据，尚未迁移到数据库。
- 景区图片主要使用远程图片源，部分图片可能与具体景区不完全匹配，后续可替换为本地精选图或更准确的图源。
- YouTube 搜索会消耗 API quota，因此只在进入景区详情页时触发，并使用 24 小时缓存。
- 旅行助手生成内容依赖百炼 API Key；未配置时仍可使用模拟返回。
- 本项目当前适合本地演示和 MVP 展示，正式上线前还需要部署和数据校验。

## 后续方向

优先级建议：

1. 部署到 Vercel 或其他云平台，让其他设备可以访问。
2. 将本地景区数据迁移到 Supabase/PostgreSQL。
3. 继续补齐全国 5A 景区数据。
4. 替换详情页景区图片，提升图片准确性。
5. 优化移动端地图、筛选和详情页滚动体验。
6. 增加收藏、历史记录和攻略分享能力。
7. 接入天气、路线规划和更细粒度的个性化推荐。

## 项目定位

这是一个面向旅游探索场景的交互式地图产品原型。当前版本已经具备完整的核心体验链路：

```text
首页中国地图
  -> 省级地图
  -> 景区详情
  -> 视频参考
  -> 旅行助手攻略生成
```

后续更适合围绕真实数据、部署上线和体验打磨继续推进，而不是继续堆叠大量新功能。
