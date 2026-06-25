import { additionalScenicSpots } from "./additional-data";
import type { Province, ScenicSpot, Video } from "./types";

export const provinces: Province[] = [
  {
    id: "gd",
    name: "广东",
    slug: "guangdong",
    mapName: "广东省",
    scenicCount: 16,
    center: [113.27, 23.13],
    description: "岭南山海、湾区城市与丹霞地貌交织，适合周末短途与亲子度假。"
  },
  {
    id: "sc",
    name: "四川",
    slug: "sichuan",
    mapName: "四川省",
    scenicCount: 18,
    center: [104.06, 30.67],
    description: "雪山、峡谷、古蜀文明与大熊猫构成的高密度自然人文目的地。"
  },
  {
    id: "js",
    name: "江苏",
    slug: "jiangsu",
    mapName: "江苏省",
    scenicCount: 26,
    center: [118.76, 32.06],
    description: "江南园林、湖泊湿地、古城水巷与博物馆资源集中。"
  },
  {
    id: "gx",
    name: "广西",
    slug: "guangxi",
    mapName: "广西壮族自治区",
    scenicCount: 11,
    center: [108.32, 22.82],
    description: "喀斯特山水、边关瀑布、海岛火山与民族风情交织，适合山水摄影和休闲度假。"
  },
  {
    id: "xj",
    name: "新疆",
    slug: "xinjiang",
    mapName: "新疆维吾尔自治区",
    scenicCount: 18,
    center: [87.62, 43.82],
    description: "雪山、湖泊、草原、沙漠、峡谷和丝路古城跨度极大，适合长线深度旅行。"
  },
  {
    id: "yn",
    name: "云南",
    slug: "yunnan",
    mapName: "云南省",
    scenicCount: 10,
    center: [102.71, 25.04],
    description: "高原湖泊、雪山古城、喀斯特地貌与民族风情交织，适合自然摄影和深度慢游。"
  },
  {
    id: "gz",
    name: "贵州",
    slug: "guizhou",
    mapName: "贵州省",
    scenicCount: 10,
    center: [106.71, 26.58],
    description: "瀑布、溶洞、喀斯特峰林、古镇和红色文化资源密集，适合山地生态旅行。"
  },
  {
    id: "hn",
    name: "湖南",
    slug: "hunan",
    mapName: "湖南省",
    scenicCount: 12,
    center: [112.98, 28.19],
    description: "奇峰峡谷、湖湘文化、红色故里和古城风貌并存，适合自然与人文结合游。"
  },
  {
    id: "jx",
    name: "江西",
    slug: "jiangxi",
    mapName: "江西省",
    scenicCount: 15,
    center: [115.86, 28.68],
    description: "名山湖泊、红色文化、陶瓷遗产与古村落资源丰富，适合研学和山水旅行。"
  },
  {
    id: "fj",
    name: "福建",
    slug: "fujian",
    mapName: "福建省",
    scenicCount: 12,
    center: [119.3, 26.08],
    description: "海岛、丹霞、土楼、古城街巷与闽台民俗融合，适合滨海休闲和文化旅行。"
  },
  {
    id: "bj",
    name: "北京",
    slug: "beijing",
    mapName: "北京市",
    scenicCount: 1,
    center: [116.41, 39.9],
    description: "古都文化、皇家建筑和现代城市地标密集，是历史文化研学旅行核心城市。"
  },
  {
    id: "tj",
    name: "天津",
    slug: "tianjin",
    mapName: "天津市",
    scenicCount: 1,
    center: [117.2, 39.12],
    description: "山海门户、近代建筑和京津周边山地休闲资源结合，适合短途度假。"
  },
  {
    id: "hb",
    name: "河北",
    slug: "hebei",
    mapName: "河北省",
    scenicCount: 1,
    center: [114.52, 38.04],
    description: "长城、皇家园林、山地与滨海资源丰富，环京旅游和文化遗产特色突出。"
  },
  {
    id: "sx",
    name: "山西",
    slug: "shanxi",
    mapName: "山西省",
    scenicCount: 1,
    center: [112.55, 37.87],
    description: "石窟、古建、晋商文化和黄河风貌集中，是中国古代建筑文化高地。"
  },
  {
    id: "nm",
    name: "内蒙古",
    slug: "inner-mongolia",
    mapName: "内蒙古自治区",
    scenicCount: 1,
    center: [111.67, 40.82],
    description: "草原、森林、火山地貌和边疆民俗交织，适合长线生态旅行。"
  },
  {
    id: "ln",
    name: "辽宁",
    slug: "liaoning",
    mapName: "辽宁省",
    scenicCount: 1,
    center: [123.43, 41.8],
    description: "清代宫苑、滨海城市、山地与工业遗产并存，东北历史文化辨识度高。"
  },
  {
    id: "jl",
    name: "吉林",
    slug: "jilin",
    mapName: "吉林省",
    scenicCount: 1,
    center: [125.32, 43.9],
    description: "长白山、森林湖泊、冰雪资源和边境风光突出，适合四季自然旅行。"
  },
  {
    id: "hlj",
    name: "黑龙江",
    slug: "heilongjiang",
    mapName: "黑龙江省",
    scenicCount: 1,
    center: [126.64, 45.75],
    description: "火山湖泊、冰雪城市、湿地森林和边疆风貌构成东北生态旅游代表。"
  },
  {
    id: "sh",
    name: "上海",
    slug: "shanghai",
    mapName: "上海市",
    scenicCount: 1,
    center: [121.47, 31.23],
    description: "都市观光、近代建筑、滨江景观和主题休闲体验集中，适合城市旅游。"
  },
  {
    id: "zj",
    name: "浙江",
    slug: "zhejiang",
    mapName: "浙江省",
    scenicCount: 1,
    center: [120.15, 30.27],
    description: "江南湖山、古镇水乡、海岛和佛教名山资源密集，旅游成熟度高。"
  },
  {
    id: "ah",
    name: "安徽",
    slug: "anhui",
    mapName: "安徽省",
    scenicCount: 1,
    center: [117.28, 31.86],
    description: "黄山、徽派古村、皖南山水和历史文化遗产集中，适合山水人文游。"
  },
  {
    id: "sd",
    name: "山东",
    slug: "shandong",
    mapName: "山东省",
    scenicCount: 1,
    center: [117.0, 36.67],
    description: "齐鲁文化、名山海岸、古城和泉水景观丰富，适合文化研学与山海旅行。"
  },
  {
    id: "ha",
    name: "河南",
    slug: "henan",
    mapName: "河南省",
    scenicCount: 1,
    center: [113.62, 34.75],
    description: "中原历史、石窟寺院、古都遗址和山水景观交织，文化厚度突出。"
  },
  {
    id: "hub",
    name: "湖北",
    slug: "hubei",
    mapName: "湖北省",
    scenicCount: 1,
    center: [114.31, 30.59],
    description: "长江名楼、山地森林、三峡风光和楚文化资源丰富，交通区位突出。"
  },
  {
    id: "cq",
    name: "重庆",
    slug: "chongqing",
    mapName: "重庆市",
    scenicCount: 1,
    center: [106.55, 29.56],
    description: "山城江峡、石刻遗产、喀斯特地貌和都市夜景融合，体验层次丰富。"
  },
  {
    id: "xz",
    name: "西藏",
    slug: "tibet",
    mapName: "西藏自治区",
    scenicCount: 1,
    center: [91.13, 29.65],
    description: "高原雪山、宗教建筑、湖泊草甸和藏地文化构成独特旅行体验。"
  },
  {
    id: "sn",
    name: "陕西",
    slug: "shaanxi",
    mapName: "陕西省",
    scenicCount: 1,
    center: [108.95, 34.27],
    description: "秦汉唐遗产、革命旧址、关中平原和秦岭山水共同构成历史文化高地。"
  },
  {
    id: "gs",
    name: "甘肃",
    slug: "gansu",
    mapName: "甘肃省",
    scenicCount: 1,
    center: [103.82, 36.06],
    description: "丝路遗产、石窟艺术、丹霞戈壁和河西走廊风貌鲜明，适合长线旅行。"
  },
  {
    id: "qh",
    name: "青海",
    slug: "qinghai",
    mapName: "青海省",
    scenicCount: 1,
    center: [101.78, 36.62],
    description: "高原湖泊、草原雪山和多民族文化融合，适合自驾和生态旅行。"
  },
  {
    id: "nx",
    name: "宁夏",
    slug: "ningxia",
    mapName: "宁夏回族自治区",
    scenicCount: 1,
    center: [106.23, 38.49],
    description: "黄河、沙漠、贺兰山和西夏文化资源集中，适合西北短线体验。"
  },
  {
    id: "hi",
    name: "海南",
    slug: "hainan",
    mapName: "海南省",
    scenicCount: 1,
    center: [110.35, 20.02],
    description: "热带海岛、滨海度假、雨林生态和民俗文化资源突出，适合全年休闲旅行。"
  }
];

const imagePool = {
  mountain:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
  lake:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85",
  forest:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85",
  city:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=85",
  garden:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20090905_Suzhou_Humble_Administrator%27s_Garden_4538.jpg?width=1600",
  temple:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=85"
};

const baseScenicSpots: ScenicSpot[] = [
  {
    id: "sc-jiuzhaigou",
    slug: "jiuzhaigou",
    name: "九寨沟风景名胜区",
    province: "四川",
    city: "阿坝藏族羌族自治州",
    latitude: 33.26,
    longitude: 103.92,
    description: "以翠海、叠瀑、彩林、雪峰闻名的世界级自然景观，四季色彩层次极强。",
    ticketPrice: "旺季约190元，观光车另计",
    openingHours: "07:30-17:00",
    bestSeason: "9-10月",
    duration: "1-2天",
    category: "自然风光",
    tags: ["自然风光", "摄影", "秋季推荐"],
    images: [imagePool.lake, imagePool.forest, imagePool.mountain],
    transportation: "成都可乘飞机至九黄机场后转车，或乘高铁/巴士至周边集散点。",
    tips: ["早晚温差大，建议分层穿衣。", "景区海拔较高，避免剧烈运动。", "旺季需提前预约门票和住宿。"]
  },
  {
    id: "sc-emei",
    slug: "emeishan",
    name: "峨眉山景区",
    province: "四川",
    city: "乐山",
    latitude: 29.52,
    longitude: 103.34,
    description: "佛教名山与云海日出胜地，金顶、寺庙和山地生态共同形成丰富游线。",
    ticketPrice: "约160元",
    openingHours: "06:00-18:00",
    bestSeason: "4-10月",
    duration: "1-2天",
    category: "历史文化",
    tags: ["历史文化", "自然风光", "徒步"],
    images: [imagePool.mountain, imagePool.temple, imagePool.forest],
    transportation: "成都东站至峨眉山站高铁约1小时，站外接景区交通。",
    tips: ["山顶气温低，需备外套。", "步道湿滑时注意防滑。"]
  },
  {
    id: "sc-dujiangyan",
    slug: "dujiangyan",
    name: "青城山-都江堰旅游景区",
    province: "四川",
    city: "成都",
    latitude: 30.99,
    longitude: 103.61,
    description: "古代水利工程与道教名山组合，兼具工程智慧、山林清幽和文化体验。",
    ticketPrice: "都江堰约80元，青城山约80元",
    openingHours: "08:00-17:30",
    bestSeason: "3-6月、9-11月",
    duration: "1天",
    category: "历史文化",
    tags: ["历史文化", "自然风光"],
    images: [imagePool.forest, imagePool.temple, imagePool.lake],
    transportation: "成都犀浦站城际列车可达离堆公园或青城山站。",
    tips: ["两个景点同日游建议早出发。", "雨季备伞和防滑鞋。"]
  },
  {
    id: "sc-leshan",
    slug: "leshan-buddha",
    name: "乐山大佛景区",
    province: "四川",
    city: "乐山",
    latitude: 29.55,
    longitude: 103.77,
    description: "依山临江而建的摩崖石刻造像，是川南历史文化游的代表景区。",
    ticketPrice: "约80元",
    openingHours: "08:00-17:30",
    bestSeason: "春秋",
    duration: "0.5-1天",
    category: "历史文化",
    tags: ["历史文化", "摄影"],
    images: [imagePool.temple, imagePool.mountain, imagePool.city],
    transportation: "成都至乐山高铁约1小时，市区公交或打车到景区。",
    tips: ["节假日栈道排队较长。", "可选择游船视角观看大佛全貌。"]
  },
  {
    id: "sc-hailuogou",
    slug: "hailuogou",
    name: "海螺沟景区",
    province: "四川",
    city: "甘孜藏族自治州",
    latitude: 29.57,
    longitude: 102.08,
    description: "贡嘎山东坡冰川、温泉与原始森林组合，适合自驾和自然探索。",
    ticketPrice: "约90元",
    openingHours: "08:00-14:30入园",
    bestSeason: "10月至次年4月",
    duration: "1-2天",
    category: "自然风光",
    tags: ["自然风光", "自驾", "摄影"],
    images: [imagePool.mountain, imagePool.forest, imagePool.lake],
    transportation: "成都自驾或客运至磨西古镇，再乘景区交通。",
    tips: ["天气变化快，注意保暖。", "高海拔地区量力而行。"]
  },
  {
    id: "gd-danxia",
    slug: "danxiashan",
    name: "丹霞山景区",
    province: "广东",
    city: "韶关",
    latitude: 25.04,
    longitude: 113.75,
    description: "以红色砂砾岩地貌著称，是广东自然景观与地质科普的代表目的地。",
    ticketPrice: "约100元",
    openingHours: "08:00-18:00",
    bestSeason: "10月至次年4月",
    duration: "1天",
    category: "自然风光",
    tags: ["自然风光", "摄影", "徒步"],
    images: [imagePool.mountain, imagePool.forest, imagePool.lake],
    transportation: "广州或深圳高铁至韶关站，再转景区专线或包车。",
    tips: ["登山路段多，建议穿防滑鞋。", "日出路线需提前确认开放时间。"]
  },
  {
    id: "gd-chimelong",
    slug: "chimelong",
    name: "长隆旅游度假区",
    province: "广东",
    city: "广州/珠海",
    latitude: 22.10,
    longitude: 113.33,
    description: "主题乐园、野生动物、海洋王国和演艺项目集中，适合亲子和家庭度假。",
    ticketPrice: "按园区约250-450元",
    openingHours: "10:00-20:00",
    bestSeason: "全年",
    duration: "1-3天",
    category: "主题乐园",
    tags: ["主题乐园", "亲子", "家庭"],
    images: [imagePool.city, imagePool.garden, imagePool.lake],
    transportation: "广州南站、珠海站均有地铁/公交/接驳到达相关园区。",
    tips: ["热门项目建议购买快速通道。", "暑期注意防晒和补水。"]
  },
  {
    id: "gd-xiqiao",
    slug: "xiqiao-mountain",
    name: "西樵山景区",
    province: "广东",
    city: "佛山",
    latitude: 22.93,
    longitude: 112.98,
    description: "岭南名山，融合火山地貌、湖泊、寺庙与南海观音文化景观。",
    ticketPrice: "约55元",
    openingHours: "07:30-17:30",
    bestSeason: "10月至次年3月",
    duration: "0.5-1天",
    category: "历史文化",
    tags: ["历史文化", "自然风光"],
    images: [imagePool.temple, imagePool.forest, imagePool.garden],
    transportation: "佛山市区可乘公交或自驾前往。",
    tips: ["景区点位分散，建议使用观光车。"]
  },
  {
    id: "gd-baiyun",
    slug: "baiyun-mountain",
    name: "白云山风景区",
    province: "广东",
    city: "广州",
    latitude: 23.18,
    longitude: 113.30,
    description: "广州城市山林地标，适合轻徒步、城市观景和短途休闲。",
    ticketPrice: "约5元起，索道另计",
    openingHours: "06:00-22:00",
    bestSeason: "秋冬",
    duration: "0.5天",
    category: "自然风光",
    tags: ["自然风光", "城市休闲"],
    images: [imagePool.forest, imagePool.city, imagePool.mountain],
    transportation: "广州市内地铁和公交可达多个入口。",
    tips: ["夜间游览注意返程交通。"]
  },
  {
    id: "gd-kaiping",
    slug: "kaiping-diaolou",
    name: "开平碉楼文化旅游区",
    province: "广东",
    city: "江门",
    latitude: 22.28,
    longitude: 112.56,
    description: "侨乡建筑与田园景观结合，展示中西合璧的近现代建筑文化。",
    ticketPrice: "联票约180元",
    openingHours: "08:30-17:30",
    bestSeason: "春秋",
    duration: "1天",
    category: "历史文化",
    tags: ["历史文化", "摄影"],
    images: [imagePool.garden, imagePool.city, imagePool.temple],
    transportation: "广州南站至开平南站后转车前往各片区。",
    tips: ["碉楼片区分散，自驾体验更顺。"]
  },
  {
    id: "js-suzhou-gardens",
    slug: "suzhou-gardens",
    name: "苏州园林",
    province: "江苏",
    city: "苏州",
    latitude: 31.32,
    longitude: 120.62,
    description: "江南古典园林代表，移步换景、叠石理水与厅堂花木极具东方审美。",
    ticketPrice: "单园约40-90元",
    openingHours: "07:30-17:30",
    bestSeason: "3-5月、9-11月",
    duration: "1天",
    category: "历史文化",
    tags: ["历史文化", "园林", "摄影"],
    images: [imagePool.garden, imagePool.temple, imagePool.lake],
    transportation: "苏州市区地铁、公交或步行串联拙政园、留园等景点。",
    tips: ["热门园林需预约。", "早晨入园更适合拍照。"]
  },
  {
    id: "js-zhouzhuang",
    slug: "zhouzhuang",
    name: "周庄古镇",
    province: "江苏",
    city: "苏州昆山",
    latitude: 31.12,
    longitude: 120.85,
    description: "典型江南水乡古镇，小桥流水、古宅民居和夜游体验完整。",
    ticketPrice: "约100元",
    openingHours: "07:30-21:00",
    bestSeason: "春秋",
    duration: "0.5-1天",
    category: "古镇",
    tags: ["古镇", "历史文化", "夜游"],
    images: [imagePool.garden, imagePool.lake, imagePool.city],
    transportation: "上海、苏州、昆山均有旅游巴士或自驾线路。",
    tips: ["夜游氛围好，但返程需提前安排。"]
  },
  {
    id: "js-nanjing-museum",
    slug: "nanjing-museum",
    name: "南京博物院",
    province: "江苏",
    city: "南京",
    latitude: 32.04,
    longitude: 118.83,
    description: "大型综合博物馆，展陈体系完整，适合文化深度游和亲子研学。",
    ticketPrice: "免费预约",
    openingHours: "09:00-17:00，周一闭馆",
    bestSeason: "全年",
    duration: "0.5-1天",
    category: "博物馆",
    tags: ["博物馆", "历史文化", "亲子"],
    images: [imagePool.temple, imagePool.city, imagePool.garden],
    transportation: "南京地铁2号线明故宫站步行可达。",
    tips: ["免费但需提前预约。", "重点展厅建议预留足够时间。"]
  },
  {
    id: "js-yuantouzhu",
    slug: "yuantouzhu",
    name: "太湖鼋头渚风景区",
    province: "江苏",
    city: "无锡",
    latitude: 31.52,
    longitude: 120.22,
    description: "太湖山水与樱花季代表景区，湖岛游船和春季花事最具吸引力。",
    ticketPrice: "约90元",
    openingHours: "08:00-17:00",
    bestSeason: "3-4月",
    duration: "0.5-1天",
    category: "自然风光",
    tags: ["自然风光", "摄影", "春季推荐"],
    images: [imagePool.lake, imagePool.garden, imagePool.forest],
    transportation: "无锡市区公交、打车或自驾前往。",
    tips: ["樱花季客流大，建议错峰。"]
  },
  {
    id: "js-lingshan",
    slug: "lingshan",
    name: "灵山胜境",
    province: "江苏",
    city: "无锡",
    latitude: 31.43,
    longitude: 120.09,
    description: "大型佛教文化主题景区，包含灵山大佛、九龙灌浴和梵宫等景观。",
    ticketPrice: "约210元",
    openingHours: "07:30-17:30",
    bestSeason: "春秋",
    duration: "0.5-1天",
    category: "历史文化",
    tags: ["历史文化", "摄影"],
    images: [imagePool.temple, imagePool.mountain, imagePool.garden],
    transportation: "无锡市区有公交和旅游专线可达。",
    tips: ["表演场次需提前查看。"]
  }
];

export const scenicSpots: ScenicSpot[] = [...baseScenicSpots, ...additionalScenicSpots];

export const videos: Video[] = scenicSpots.flatMap((spot, index) => [
  {
    id: `${spot.id}-aerial`,
    scenicSpotId: spot.id,
    platform: "航拍",
    title: `${spot.name}｜云端视角`,
    url: "#",
    thumbnail: spot.images[0],
    type: "航拍视频"
  },
  {
    id: `${spot.id}-visitor`,
    scenicSpotId: spot.id,
    platform: index % 2 === 0 ? "YouTube" : "抖音",
    title: `${spot.name}｜游客实拍路线`,
    url: "#",
    thumbnail: spot.images[1],
    type: "游客实拍"
  }
]);

export const categories = ["全部", "自然风光", "历史文化", "古镇", "主题乐园", "博物馆", "红色旅游"];

export function getProvinceBySlug(slug: string) {
  return provinces.find((province) => province.slug === slug);
}

export function getSpotBySlug(slug: string) {
  return scenicSpots.find((spot) => spot.slug === slug);
}

export function getSpotsByProvince(provinceName: string) {
  return scenicSpots.filter((spot) => spot.province === provinceName);
}

export function getVideosBySpot(spotId: string) {
  return videos.filter((video) => video.scenicSpotId === spotId);
}
