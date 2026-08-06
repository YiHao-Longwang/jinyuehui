import {
  assetBase,
  ContactButtons,
  Diamond,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  telegramHrefCn,
  whatsappHrefCn,
} from "../../site-common";

const cnBase = "/cn";

const packageCards = [
  {
    id: "pk-b1f1",
    title: "双人 12 小时门票",
    tag: "2 位大人 · 买一送一",
    image: "img-b1f1.jpg",
    desc: "一张订单两位大人同行入场",
    prices: [
      { label: "星期日-星期四", price: "169", per: "/ 2 位" },
      { label: "星期五、六与公共假期", price: "199", per: "/ 2 位" },
    ],
    features: ["泡池、汗蒸、桑拿与休息区", "晚餐自助 6-9pm + 其他时段简餐", "完整 12 小时，双人最划算"],
    notes: ["星期日在这里算平日，星期日到星期四都是低价档。", "价格是 2 位大人的总价，不是每人价。"],
    button: "预约",
  },
  {
    id: "pk-solo",
    title: "单人 12 小时门票 + 送 30 分钟按摩",
    tag: "单人 · 线上福利",
    image: "img-solo.jpg",
    desc: "一个人也能泡足 12 小时，再送一项按摩",
    prices: [
      { label: "星期日-星期四", price: "169", per: "/ 人" },
      { label: "星期五、六与公共假期", price: "199", per: "/ 人" },
    ],
    features: ["泡池、汗蒸、桑拿、休息区 + 晚餐自助", "免费 30 分钟按摩：足腿或中式局部，自选", "3 位或 5 位来？搭配买一送一最划算"],
    notes: ["星期日在这里算平日，星期日到星期四都是低价档。", "只限线上预约，现场 walk-in 没有这个赠送。"],
    button: "预约",
  },
  {
    id: "pk-daytime",
    title: "日间按摩配套",
    tag: "日间 · 9am-5pm",
    image: "img-daytime.jpg",
    desc: "每日 9am-5pm 入场，一个人也能买",
    prices: [{ label: "每人 · 每天同价", was: "RM498", price: "199", per: "/ 人" }],
    features: ["3 选 1：60 分钟按摩 / 60 分钟足疗 / 排毒护理 5 选 2", "泡池、汗蒸与桑拿", "餐饮、水果与冰淇淋"],
    notes: ["预约时间就是入场时间；超过 5pm 需要补差价。"],
    button: "预约 · RM199 / 人",
  },
  {
    id: "pk-scrub",
    title: "扬州搓澡配套",
    tag: "深层洁净 · 搓澡 + 门票",
    image: "img-scrub.jpg",
    desc: "传统搓澡，已含 12 小时门票",
    prices: [
      { label: "星期日-星期四", was: "RM319", price: "199", per: "/ 人" },
      { label: "星期五、六与公共假期", was: "RM349", price: "239", per: "/ 人" },
    ],
    features: ["30 分钟传统扬州搓澡，先泡后搓", "12 小时入场：泡池、汗蒸与桑拿", "餐饮、水果与冰淇淋"],
    notes: ["12 小时门票已经包含，不需要另买入场券。"],
    button: "预约",
  },
  {
    id: "pk-allday-sm",
    title: "沐净舒养套餐",
    tag: "搓澡 + 按摩 · 全天",
    image: "img-scrub.jpg",
    desc: "12 小时门票 + 30 分钟搓澡 + 60 分钟按摩",
    prices: [{ label: "套餐", price: "379", per: "/ 人" }],
    features: ["12 小时温泉入场，含餐饮", "30 分钟扬州搓澡", "60 分钟推拿或足疗"],
    notes: ["一张票包含入场、搓澡与按摩。"],
    button: "预约 · RM379 / 人",
  },
  {
    id: "pk-daytime-duo",
    title: "日间双人套餐",
    tag: "双人 · 日间",
    image: "img-daytime.jpg",
    desc: "两位日间入场 + 每人一项 60 分钟护理",
    prices: [{ label: "双人套餐", price: "379", per: "/ 2 人" }],
    features: ["两张日间入场", "每人一项 60 分钟护理", "按摩、足疗或排毒护理可选"],
    notes: ["每日 9:00-17:00 · 一个套餐覆盖两位客人。"],
    button: "预约 · RM379 / 2 人",
  },
];

const treatmentGroups = [
  {
    cn: "全身项目",
    en: "SPA / Full Body",
    rows: [
      ["舒缓触感疗程", "60 分钟", "RM369++"],
      ["热石深层排毒疗程★", "80 分钟", "RM499++"],
      ["法式尊宠疗程★", "100 分钟", "RM699++"],
      ["五行至尊 SPA★", "110 分钟", "RM799++"],
    ],
  },
  {
    cn: "足疗项目",
    en: "Foot Massage",
    rows: [
      ["经典足疗", "60 分钟", "RM299++"],
      ["足疗配套★", "80 分钟", "RM499++"],
    ],
  },
  {
    cn: "指压项目",
    en: "Shiatsu Massage",
    rows: [
      ["局部调理", "30 分钟", "RM199++"],
      ["中式推拿", "60 分钟", "RM299++"],
      ["传统泰式按摩", "70 分钟", "RM399++"],
    ],
  },
  {
    cn: "小项目",
    en: "Other Treatment",
    rows: [
      ["舒耳疗程", "单次", "RM150++"],
      ["唐式耳浴", "60 分钟", "RM299++"],
      ["扬州修脚", "单次", "RM150++"],
      ["穴位拔罐", "单次", "RM150++"],
      ["经络刮痧", "单次", "RM150++"],
      ["扬州搓澡", "单次", "RM150++"],
      ["花式背踩", "30 分钟", "RM199++"],
      ["洗眼 SPA", "单次", "RM150++"],
    ],
  },
  {
    cn: "保养项目",
    en: "Maintenance · Signature",
    rows: [
      ["四手和韵疗程★", "70 分钟", "RM999++"],
      ["下肢深层调理★", "90 分钟", "RM699++"],
      ["骨盆能量调理★", "90 分钟", "RM699++"],
    ],
  },
];

const drinkRows = [
  ["威士忌可乐桶", "1.5L RM59", "3L RM99"],
  ["Mojito 桶", "1.5L RM59", "3L RM99"],
  ["Jager 桶", "1.5L RM59", "3L RM99"],
  ["龙舌兰日出", "1.5L RM69", "3L RM118"],
  ["梅子凤梨冰酒", "1.5L RM69", "3L RM118"],
  ["Sangria", "1.5L RM69", "3L RM118"],
  ["长岛冰茶", "1.5L RM79", "3L RM138"],
  ["葡萄柚朗姆", "1.5L RM79", "3L RM128"],
];

const rooms = [
  {
    id: "room-golf",
    title: "高尔夫房",
    image: "fac-golf.jpg",
    big: "199",
    cap: "3 小时 · 最划算",
    hourly: [
      ["2 小时", "RM139"],
      ["按小时租", "RM99 / 小时"],
    ],
    features: ["关上门就能挥杆，私人高尔夫模拟房，旁边还有 4 张按摩椅", "按房收费，不按人头收费", "RM99 / 1 小时 · RM139 / 2 小时 · RM199 / 3 小时", "只接受 WhatsApp 预约"],
  },
  {
    id: "room-storm",
    title: "暴雨淋浴房",
    image: "fac-storm.jpg",
    big: "699",
    cap: "订 3 送 1 · 共 4 小时 · 最多 15 人 · 最划算",
    hourly: [["按小时租", "RM499 / 小时"]],
    features: ["订 3 小时送 1 小时，共 4 小时", "最多 15 人私人包间", "按房收费，不参与按摩 20% 折扣", "RM499 以上房费只含 1 位免费入场，其他客人照常买入场票"],
  },
];

const facilities = [
  ["冰火两重天", "fac-icefire.jpg?osw=0.9.23", "13°C 玄冰池与 43°C 中药池冷热交替，星空顶下泡完通体舒畅。"],
  ["盐晶汗蒸", "fac-steam.jpg?osw=0.9.23", "暖光盐晶墙汗蒸房，坐着发一身透汗，循环更舒畅。"],
  ["按摩房", "fac-massage.jpg?osw=0.9.23", "独立按摩房，三张床位，家人朋友可同房一起做；推拿、泰式、精油等 20 项护理都在这里安排。"],
  ["扬州搓澡", "fac-scrub.jpg?osw=0.9.23", "专设搓澡房，传统手艺搓出一身轻，单项或含门票的套餐都有。"],
  ["影视厅 · 休息厅", "fac-movie.jpg?osw=0.9.23", "影视厅连着休息厅，人手一副耳机，爱看的看片，想睡的安睡。"],
  ["沉浸光影区", "fac-immersive.jpg?osw=0.9.23", "星幕光影长廊，泡完慢慢回神，顺手就是一张大片。"],
  ["足浴房", "fac-recliner.jpg?osw=0.9.23", "足浴专用躺椅房，足疗、修脚都在这里做，做完顺势休息。"],
  ["盐石汗蒸房", "fac-onsen.jpg?osw=0.9.23", "躺在温热盐石床上，让热力慢慢透进身体，泡汤前后都适合。"],
  ["护理房", "fac-treatment.jpg?osw=0.9.23", "热石排毒、法式尊宠、五行至尊等深层疗程会安排在这里。"],
  ["颐和私人餐房", "fac-vip.jpg?osw=0.9.23", "适合正式聚餐的包房，可围桌点招牌菜，需要提前预约。"],
  ["高尔夫主题房", "fac-golf.jpg?osw=0.9.23", "高尔夫主题私人房，每房 RM99/小时起，可直接预约。"],
  ["更衣室", "fac-locker.jpg?osw=0.9.23", "每位客人都有独立储物柜与宽敞长凳，泡汤前先舒服安顿。"],
  ["梳洗区", "fac-grooming.jpg?osw=0.9.23", "洗漱台与梳妆座位齐全，汗蒸泡汤后可以好好整理。"],
  ["餐厅", "fac-dining.jpg?osw=0.9.23", "晚餐自助 6-9pm，其他时段有简餐、水果与冰淇淋。"],
];

const homeChips = ["同一批店内技师", "床单毛巾与精油都会带到", "酒店 · 公寓 · 住家", "线上购买付款"];
const homePlans = [
  {
    code: "outcall-classic",
    title: "经典 2 小时上门按摩",
    tag: "日间推荐",
    image: "outcall-plan-warm.jpg?osw=0.9.23",
    desc: "先用精油松开背部，再用传统泰式拉伸全身，两小时完整放松。",
    price: "RM699",
    features: ["60 分钟精油按摩 + 60 分钟传统泰式，顺序固定", "开始时间 9:00 AM-10:00 PM", "适合酒店或家里好好留出一段放松时间", "线上最早可预约 3 小时后的时段；更急请 WhatsApp"],
  },
  {
    code: "outcall-anytime",
    title: "随时 2 小时上门按摩",
    tag: "自由搭配",
    image: "outcall-plan-classic.jpg?osw=0.9.23",
    desc: "固定两小时，一个清楚价格。告诉我们你偏好精油、推拿、泰式或足部护理。",
    price: "RM798",
    features: ["固定 120 分钟，RM798", "可备注偏好的精油、推拿、泰式或足疗组合", "全天可预约，最早为下单后 3 小时", "需要更长时间请直接 WhatsApp"],
  },
  {
    code: "outcall-fourhands",
    title: "四手尊宠 · 2 小时",
    tag: "四手护理",
    image: "outcall-plan-duo.jpg?osw=0.9.23",
    desc: "两位技师同步护理，肩背与腿部同时照顾，两小时等于四小时手感。",
    price: "RM1,699",
    night: true,
    features: ["两位技师同步，只服务一位客人", "背部与腿部同时护理，释放更快", "每日 9:00 AM-10:00 PM 可开始；RM100 交通费覆盖两位技师", "线上最早可预约 3 小时后；更急请 WhatsApp"],
  },
];
const homeFlow = [
  ["1 · 选配套", "在网站选择配套、日期与开始时间，然后加入购物车。"],
  ["2 · 线上付款", "结账支付配套价格与 8% SST。交通费不在线上收。"],
  ["3 · WhatsApp 确认", "付款后团队会确认服务地址、到达时间与 30km 服务范围。"],
  ["4 · 技师到达", "技师准时到达，在你的床上铺一次性床单后开始；RM100 交通费到场现金支付。"],
];
const homeFaqs = [
  ["总价怎么算？", "经典 RM699 + 8% SST；随时 RM798 + 8% SST；四手 RM1,699 + 8% SST。RM100 交通费到场现金支付。"],
  ["付款后怎么确认地址？", "团队会通过 WhatsApp 联系你确认服务地址和到达时间，并人工确认 30km 范围。"],
  ["服务范围到哪里？", "距离门店 30km 内，以下单后的实际地址确认。"],
  ["我需要准备什么？", "不用搬家具，只要有一个能平躺、不被打扰的位置。技师会带精油、一次性床单和毛巾。"],
  ["最快多久能到？", "线上最早可选下单后 3 小时。更急的话，把地址和时间 WhatsApp 给我们。"],
  ["半夜可以预约吗？", "随时配套可全天预约，包括凌晨 3 点。经典和四手开始时间为每日 9am-10pm。"],
  ["怎么付款？", "可线上支付配套价与 8% SST，或通过 WhatsApp 安排；RM100 交通费到场现金支付。"],
];

const beautyChips = ["RM599 含温泉门票", "男女都可预约", "一对一专员服务", "WhatsApp 提前预约"];
const lightTreatments = [
  ["光子嫩肤", "beauty-photon.jpg?osw=0.9.23", "温和光电面部护理，针对暗沉、粗糙与肤色不均，让肌肤看起来更干净透亮。"],
  ["淡斑护理", "beauty-spot.jpg?osw=0.9.23", "针对面部色素沉着的局部亮肤护理；现场皮肤评估后确认方案与价格。"],
  ["冰点脱毛", "beauty-hair.jpg?osw=0.9.23", "810nm 冰点技术，低温感更温和；按部位报价，也可组合多部位。"],
];
const signature = [
  ["项目内容", "先泡汤汗蒸，再到美容部完成身体植物焕亮护理；身体膜等待时同步完成水光面部护理与手部护理。"],
  ["适合人群", "肤色暗沉、肤色不均、干燥缺水、手部粗糙，或重要场合前想让状态更亮的人。"],
  ["须知", "敏感肌、近期暴晒或怀孕请先告知专员；护理后 48 小时注意防晒与保湿。"],
];
const facial = [
  ["项目内容", "深层清洁、黑头清理、铲皮、精华导入、面部刮痧、冰锤舒缓与修复面膜。"],
  ["适合人群", "毛孔堵塞、黑头明显、妆容不服帖，或皮肤很久没做深层清洁。"],
  ["须知", "有开放伤口或严重爆痘请改期；护理后少化厚妆并注意防晒。"],
];
const beautyFaqs = [
  ["含温泉门票怎么用？", "身体焕亮水光配套含同日温泉门票，先泡汤汗蒸，再到美容部护理。"],
  ["男生可以预约吗？", "可以。主推配套男女都适合，光电项目会先做皮肤评估。"],
  ["需要提前预约吗？", "需要，每个 session 都是一对一。请 WhatsApp 锁定时段。"],
  ["为什么光电项目没有标价？", "光子、淡斑和脱毛会按皮肤状态与部位定制，咨询后确认完整报价。"],
  ["怎么付款？", "目前到店付款。WhatsApp 预约即可保留时段。"],
];

const tcmChips = ["免费中医把脉", "驻店中医师", "一对一专员服务", "WhatsApp 提前预约"];
const tcmTreatments = [
  ["全身经络药拓调理", "tcm-meridian.jpg?osw=0.9.23", "72 种中草药药包配合专业技法沿经络推行，做完温暖、松开、轻盈。", "RM699"],
  ["艾灸", "tcm-moxa.jpg?osw=0.9.23", "温热艾灸一层层渗入，适合手脚冰冷和身体寒凉感。", "RM199"],
  ["草本泥灸", "tcm-mud.jpg?osw=0.9.23", "温热草本泥包覆调理，热感柔和包住身体，第一分钟就很舒服。", "RM199"],
  ["中医正骨调理", "tcm-bone.jpg?osw=0.9.23", "经中医师评估后，以传统正骨手法调理关节紧绷与体态疲劳。", "RM598"],
  ["女性私密养护", "tcm-intimate.jpg?osw=0.9.23", "女性专属私密护理，独立房间，女性专员全程一对一。", ""],
];
const specialties = [
  ["01 · 艾灸 / 泥灸 · RM199 · 每项", "温经散寒，行气通络，扶阳固本，适合寒湿性体质"],
  ["02 · 全身经络药拓调理 · RM699 · 特价", "72 种中草药药包配合专业技法疏通经络，进行全身舒缓养护"],
  ["03 · 中医正骨调理 · RM598", "经中医师评估，调理筋骨关节，改善疼痛"],
  ["04 · 药液筋膜松解（肩颈腰背）· RM499", "针对肩颈、腰背筋膜紧绷、酸麻胀痛进行专项调理"],
  ["05 · 体态与富贵包调理 · RM499", "驼背、圆肩、高低肩、富贵包及肩背体态调理"],
  ["06 · 刺络 · RM338", "减轻局部组织压力，疏通经络，调和气血，改善不适"],
  ["07 · 针灸 · RM598", "刺激穴位，缓解疼痛，改善功能失调，促进自我修复"],
  ["08 · 小针刀 · RM878", "用于松解慢性软组织黏连，针对肌肉骨骼疼痛进行松解调理"],
];
const physician = [
  ["针灸 · RM598", "由中医师按你的情况选择经络穴位进行细针刺激。"],
  ["小针刀 · RM878", "针对顽固劳损与粘连的深层松解，评估后由医师一对一操作。"],
  ["刺络 · RM338", "传统疗法，用于局部瘀滞、酸重不适。"],
];
const tcmInfo = {
  meridian: [
    ["项目内容", "72 种草本药包加热后，沿经络按压、滚动与推行。"],
    ["适合人群", "久坐久站、肩颈腰背紧、手脚冰冷或感觉身体沉重不通。"],
    ["须知", "这是养生舒缓护理，不是医疗治疗；怀孕、高血压或心脏病请提前告知。"],
  ],
  intimate: [
    ["项目内容", "围绕清洁、滋养与放松的一对一私密护理，在独立房间完成。"],
    ["适合人群", "产后日常养护、干涩不适或想做规律私密保养的女性。"],
    ["须知", "经期与怀孕期间不适合；若有持续症状，请先咨询医生。"],
  ],
};
const tcmFaqs = [
  ["需要提前预约吗？", "需要。每个 session 都是一对一，请 WhatsApp 锁定时段。"],
  ["把脉真的免费吗？", "是的，评估免费且没有强制消费；评估后会说明适合项目与价格。"],
  ["价格是最终价吗？", "是的，列出的价格与店内菜单一致，到店付款，开始前会确认总价。"],
  ["针灸和小针刀谁操作？", "由中医师亲自操作，且必须先做把脉评估。"],
  ["女性私密养护是医疗服务吗？", "不是，这是日常舒适护理，不涉及医疗诊断或治疗。"],
  ["怎么付款？", "目前到店付款。WhatsApp 预约即可保留时段。"],
];

const faqRows = [
  ["真的可以待 12 小时？", "可以，从进场算起 12 小时，设施都包含。"],
  ["星期日算平日还是周末？", "平日价。星期日到星期四都是平日；星期五、六和公共假期是另一个档。"],
  ["公共假期怎么算钱？", "按周末价。选日期时价格会直接显示，不用自己算。"],
  ["买一送一怎么用？", "一张订单，2 位大人，同一天同一时间一起进场；不能拆成两次使用。"],
  ["一个人最划算买什么？", "单人 12 小时门票，线上预约送 30 分钟按摩。"],
  ["3 位或 5 位怎么买？", "成双的人买买一送一，多出来的一位买单人票。"],
  ["配套包含按摩吗？", "单人票线上预约送 30 分钟按摩，日间配套也包含指定护理。"],
  ["消费 RM499 可以免费入场吗？", "单笔护理消费 RM499 以上可免费入场，直接预约护理即可，不需要另买门票。"],
  ["小孩可以来吗？", "可以。儿童票适合 12 岁及以下并需成人陪同；2 岁及以下到前台登记免费。"],
  ["情侣可以一起泡吗？", "公共区域共享，浴区男女分开，没有混浴区。"],
  ["需要泳衣吗？会提供什么？", "浴区以裸浴为主，也可自带泳衣；店内提供毛巾与基本浴服。"],
  ["可以过夜吗？", "12 小时内可以在休息区过夜休息，但这里是 spa，不是酒店。"],
  ["食物是 halal 吗？", "不是，食物非 halal，也没有 halal 认证。"],
  ["可以带蛋糕或外食吗？", "蛋糕可以，外食可以；酒精饮品不允许带入。"],
  ["生日有优惠吗？", "生日正负 2 天内可向团队询问生日票。"],
  ["需要提前多久预约？", "所有配套至少提前 1 小时预约。"],
  ["可以改期吗？", "可以，到店前 1 天可通过 WhatsApp 免费改期。"],
  ["退款怎么处理？", "WhatsApp 联系团队核实订单，退款会按原支付方式处理。"],
  ["到店需要带什么？", "带手机即可，到前台出示订单。"],
  ["walk-in 和线上预约有差吗？", "线上预约有指定福利，周末也比较满，建议提前预约。"],
];

function Money({ was, price, per }: { was?: string; price: string; per?: string }) {
  return (
    <span>
      {was ? <span className="was">{was}</span> : null}
      <span className="rm">
        <span className="cur">RM</span>
        {price}
        <sup className="osw-pp">++</sup>
        {per ? <span className="per">{per}</span> : null}
      </span>
    </span>
  );
}

function Band({ cn, en }: { cn: string; en: string }) {
  return (
    <div className="bandwrap-t">
      <div className="band">
        <b>{cn}</b>
        <span>{en}</span>
      </div>
    </div>
  );
}

function MiniGrid({ items }: { items: string[][] }) {
  return (
    <div className="minis">
      {items.map(([title, desc]) => (
        <article className="mini-card" key={title}>
          <h3>{title}</h3>
          <p className="desc">{desc}</p>
        </article>
      ))}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      <div className="container">
        {items.map((chip) => (
          <span className="c" key={chip}>
            <Diamond />
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function PackagesPageCn() {
  return (
    <>
      <Header active="Packages" locale="cn" />
      <main>
        <Hero
          eyebrow="One Spa · 吉隆坡 · 24 小时营业"
          title={<>泡进一池温汤</>}
          copy="一张票，完整 12 小时；泡池、汗蒸、按摩与餐饮都包含在内。"
          image="hero-packages-rain.jpg?osw=0.9.23"
        />

        <nav className="subnav" aria-label="Sections">
          <div className="row">
            <a className="pill on" href="#featured">配套</a>
            <a className="pill" href="#combos">组合推荐</a>
            <a className="pill" href="#treatments">按摩</a>
            <a className="pill" href="#drinks">酒水桶</a>
            <a className="pill" href="#room">私人房</a>
            <a className="pill" href="#know">预约须知</a>
          </div>
        </nav>

        <section className="trust">
          <div className="container">
            <div className="t"><span className="dia" />付款后会收到确认邮件，到前台出示订单即可</div>
            <div className="t"><span className="dia" />从 check-in 起 12 小时，泡池、汗蒸、休息区与餐饮都包含</div>
            <div className="t"><span className="dia" />提前 1 天可免费改期，不限次数 · <a href="#know">政策</a></div>
          </div>
        </section>

        <div className="osw-onsen-crosslink">
          <div className="container crosslinks">
            <a className="osw-product-text-link" href={`${cnBase}/wenquan/`}>吉隆坡 24 小时汤泉</a>
            <a className="osw-product-text-link" href={`${cnBase}/facilities/`}>完整价格与设施列表</a>
          </div>
        </div>

        <section id="featured">
          <SectionHead eyebrow="主推配套" title="挑好配套，几分钟订完" />
          <div className="container">
            <div className="cards">
              {packageCards.map((item) => (
                <article className="card" id={item.id} key={item.id}>
                  <div className="ph"><img src={`${assetBase}/${item.image}`} alt={item.title} /></div>
                  <div className="body">
                    <div className="tagrow"><span className="tag">{item.tag}</span></div>
                    <h3>{item.title}</h3>
                    <p className="desc">{item.desc}</p>
                    <div className="prices">
                      {item.prices.map((row) => (
                        <div className="prow" key={row.label}>
                          <span className="lbl">{row.label}</span>
                          <span className="dots" />
                          <Money was={row.was} price={row.price} per={row.per} />
                        </div>
                      ))}
                    </div>
                    <p className="taxnote">++ = 10% 服务费 + 8% SST；选完日期后显示到手价</p>
                    <ul className="feat">{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    {item.notes.map((note) => <div className="note soft" key={note}>{note}</div>)}
                    <div className="grow" />
                    <button
                      className="btn wide"
                      type="button"
                      data-book={item.id.replace("pk-", "")}
                      data-book-locale="cn"
                    >
                      {item.button}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="combos">
          <SectionHead eyebrow="组合推荐" title="和朋友家人一起来？" />
          <div className="container">
            <div className="combo">
              <div className="grid2">
                <div className="row"><h4>2 位大人</h4><p>一张买一送一订单就覆盖两个人。</p></div>
                <div className="row"><h4>3 位或 5 位大人</h4><p>成双的人买买一送一，多出来的一位买单人票，还能拿免费 30 分钟按摩。例如 3 位大人星期日-星期四：RM169 + RM169。</p></div>
                <div className="row">
                  <h4>带小孩</h4>
                  <p>大人按以上方式买票；每位小孩加儿童票（12 岁及以下，需成人陪同；2 岁以下到前台免费登记）。</p>
                  <div className="osw-detail-links">
                    <a href={`${cnBase}/packages/#know`}>平日票详情</a><span aria-hidden="true">·</span><a href={`${cnBase}/packages/#know`}>周末 / 公假详情</a>
                  </div>
                  <button className="mini" type="button" data-book="kids" data-book-locale="cn">儿童票 · 预约</button>
                </div>
                <div className="row"><h4>10 人以上 / 公司团</h4><p>直接联系 WhatsApp 或 Telegram，团体价可商量。</p><div className="mini-contact-row"><a className="mini contact-wa" href={whatsappHrefCn} target="_blank" rel="noopener">WhatsApp 我们</a><a className="mini contact-tg" href={telegramHrefCn} target="_blank" rel="noopener">Telegram 我们</a></div></div>
              </div>
            </div>
            <p className="fine">示例使用星期日-星期四价格；++ = 10% 服务费 + 8% SST。</p>
          </div>
        </section>

        <section id="treatments">
          <SectionHead eyebrow="按摩与护理" title="加一项护理" sub="护理项目需要入场券；单笔消费 RM499+，即可含一位免费入场。" />
          <div className="container">
            <div className="deal">
              已预约 <b>买一送一</b> 或 <b>单人票</b>？<b>同一订单加购当日 RM499 以下护理，可自动享 20% 折扣</b>。RM499 以上（★）项目不参与折扣，因为<b>每项已含一位免费入场</b>，可单独预约护理，不用另买门票。
            </div>
            {treatmentGroups.map((group) => (
              <div key={group.en}>
                <Band cn={group.cn} en={group.en} />
                <div className="tlist">
                  {group.rows.map(([name, time, price]) => (
                    <div className="trow" key={name}>
                      <span className="nm">{name}</span>
                      <span className="min">{time}</span>
                      <span className="dots" />
                      <span className="rm">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="legend">★ RM499 以上：含一位免费入场，不参与 20% 折扣；每项护理只享一种优惠 · ++ = 10% 服务费 + 8% SST。</p>
          </div>
        </section>

        <section id="drinks">
          <SectionHead eyebrow="酒水桶" title="派对酒水桶" sub="不用一杯一杯点，1.5L 起，适合球赛夜、私人房和聚会。" />
          <div className="container">
            <Band cn="酒水桶" en="Drink Barrels · 1.5L / 3L" />
            <div className="tlist">
              {drinkRows.map(([name, small, large]) => (
                <div className="trow" key={name}>
                  <span className="nm">{name}</span>
                  <span className="min">{small}</span>
                  <span className="dots" />
                  <span className="rm">{large}</span>
                </div>
              ))}
            </div>
            <p className="legend">可到店或 WhatsApp 点单 · 可在餐厅、影视厅或私人房享用 · 不可带外酒 · 价格未含 10% 服务费与 8% SST</p>
          </div>
        </section>

        <section id="room">
          <SectionHead eyebrow="私人房" title="私人房体验" />
          <div className="container">
            <div className="cards rooms">
              {rooms.map((room) => (
                <article className="card" id={room.id} key={room.id}>
                  <div className="ph"><img src={`${assetBase}/${room.image}`} alt={room.title} /></div>
                  <div className="body">
                    <h3>{room.title}</h3>
                    <div className="roomprice">
                      <span className="big"><span className="cur">RM</span>{room.big}</span>
                      <span className="cap">{room.cap}</span>
                    </div>
                    {room.hourly.map(([label, price]) => (
                      <div className="hourly" key={label}><span>{label}</span><span className="dots" /><span className="rm">{price}</span></div>
                    ))}
                    <p className="taxnote">价格未含 10% 服务费与 8% SST，到店结算</p>
                    <ul className="feat">{room.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    <div className="grow" />
                    <div className="contact-pair room-contact-pair"><a className="btn contact-wa wide" href={whatsappHrefCn} target="_blank" rel="noopener">WhatsApp 预约私人房</a><a className="btn contact-tg wide" href={telegramHrefCn} target="_blank" rel="noopener">Telegram 预约私人房</a></div>
                  </div>
                </article>
              ))}
            </div>
            <ul className="knowrules">
              <li>私人房只通过 WhatsApp 预约（+60 12-670 2560），不在线上售卖</li>
              <li>按房收费；RM499+ 房费只含 1 位入场，其他客人照常买票</li>
              <li>房间预约不与门票 + 按摩 20% 折扣叠加</li>
            </ul>
          </div>
        </section>

        <section id="know">
          <SectionHead eyebrow="预约须知" title="预约前请看" />
          <div className="container">
            <div className="knowwrap">
              <div className="know">
                <div className="t"><span className="dia" />所有配套：至少提前 1 小时线上预约。</div>
                <div className="t"><span className="dia" />价格未含 10% 服务费与 8% SST，结账时会显示最终价格。</div>
                <div className="t"><span className="dia" />付款后会收到确认邮件，到前台出示即可入场。</div>
                <div className="t"><span className="dia" />计划有变？到店前 1 天可免费改期，不限次数；退款通常 14 天内退回原支付方式。</div>
              </div>
              <div className="policylinks">
                <a href={`${cnBase}/cancellation-and-refund-policy-on-service/`}><span>取消与改期</span></a>
                <a href={`${cnBase}/terms-conditions/`}><span>条款与细则</span></a>
                <a href={`${cnBase}/privacy-policy/`}><span>隐私政策</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

function FacilitiesPageCn() {
  return (
    <>
      <Header active="Facilities" locale="cn" />
      <main>
        <Hero eyebrow="One Spa · 设施" title={<>一站式温泉会所</>} copy="一张票包含泡池、汗蒸、桑拿、休息厅、影视区与餐饮，完整 12 小时。" image="fac-hero-immersive.jpg?osw=0.9.23" />
        <section id="facilities">
          <div className="container fac-page-grid">
            <div className="fac-grid">
              {facilities.map(([title, image, copy], index) => (
                <article className={`fac${index === 0 ? " lead" : ""}`} key={title}>
                  <div className="ph"><img src={`${assetBase}/${image}`} alt={title} /></div>
                  <div className="fb">
                    <h3>{title}</h3>
                    <p>{copy}</p>
                    {["按摩房", "扬州搓澡", "足浴房", "护理房"].includes(title) ? <a className="more" href={`${cnBase}/packages/#treatments`}>看按摩项目与价格 &rsaquo;</a> : null}
                    {title === "高尔夫主题房" ? <a className="more" href={`${cnBase}/packages/#room`}>看房间价格 &rsaquo;</a> : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="treatments-teaser">
          <SectionHead eyebrow="护理项目" title="20 项按摩与护理" sub="足疗、耳疗、拔罐、刮痧与招牌疗程，所有价格都公开列在配套页。" />
          <div className="center-cta"><a className="btn line" href={`${cnBase}/packages/#treatments`}>看按摩项目与价格</a></div>
        </section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

function HomeMassagePageCn() {
  return (
    <div className="osw-outcall">
      <Header active="Home Service" locale="cn" />
      <main>
        <Hero eyebrow="One Spa · 上门服务 · 吉隆坡" title={<>店里的按摩，<br />到你家</>} copy="同一批 One Spa 技师，现在可以到你的酒店、公寓或住家。技师会带按摩油和一次性床单毛巾，铺在你的床上后开始服务。你不用搬家具，只要躺下。" image="outcall-hero.jpg?osw=0.9.23">
          <a className="btn clay" href="#outcall-plans">线上购买</a>
          <ContactButtons locale="cn" className="hero-contact-pair" whatsappLabel="有问题？WhatsApp 我们" telegramLabel="Telegram 我们" />
        </Hero>
        <Chips items={homeChips} />
        <section id="outcall-plans">
          <SectionHead eyebrow="配套与价格" title="三个配套，价格清楚" sub="价格公开，没有隐藏收费。价格只需加 8% SST，不收服务费；30km 内 RM100 交通费到场现金支付。" />
          <div className="container">
            <div className="cards">
              {homePlans.map((plan) => (
                <article className={`card${plan.night ? " night" : ""}`} key={plan.title}>
                  <div className="ph"><img src={`${assetBase}/${plan.image}`} alt={plan.title} /></div>
                  <div className="body">
                    <div className="tagrow"><span className={`tag${plan.night ? " hot" : ""}`}>{plan.tag}</span></div>
                    <h3>{plan.title}</h3>
                    <p className="desc">{plan.desc}</p>
                    <div className="grow">
                      <div className="price"><span className="rm">{plan.price}</span></div>
                      <p className="taxnote">价格只需加 8% SST，不收服务费。RM100 交通费到场现金支付。</p>
                      <ul className="feat">{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    </div>
                    <div className="btnrow outcall-actions">
                      <button className="btn" type="button" data-book={plan.code} data-book-locale="cn">线上购买 · {plan.price}</button>
                      <ContactButtons locale="cn" className="outcall-contact-pair" whatsappLabel="WhatsApp 咨询" telegramLabel="Telegram 咨询" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="fine">价格只需加 8% SST，不收服务费。30km 内 RM100 交通费到场现金支付。</p>
          </div>
        </section>
        <section id="outcall-flow">
          <SectionHead eyebrow="购买流程" title="线上付款，然后 WhatsApp 确认" />
          <div className="container"><MiniGrid items={homeFlow} /></div>
        </section>
        <section id="outcall-faq">
          <SectionHead eyebrow="预约前" title="上门服务 FAQ" />
          <div className="container">
            <div className="faqwrap">
              <div className="faq">{homeFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="plus" /></summary><div className="a">{answer}</div></details>)}</div>
              <div className="center-cta faq-cta"><p className="fine">还有其他问题？</p><ContactButtons locale="cn" whatsappLabel="WhatsApp 咨询" telegramLabel="Telegram 咨询" /></div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </div>
  );
}

function BeautyPageCn() {
  return (
    <>
      <Header active="Beauty" locale="cn" />
      <main>
        <Hero eyebrow="One Spa · 美容部 · 吉隆坡" title={<>美容护理，现在也在 One Spa</>} copy="主推身体焕亮水光配套 RM599，含同日温泉门票；另有光子嫩肤、淡斑护理与冰点脱毛，均需预约。" image="beauty-hero.jpg?osw=0.9.23" />
        <Chips items={beautyChips} />
        <section id="beauty-signature">
          <SectionHead eyebrow="主推开业配套" title="身体焕亮水光配套" sub="一次到店完成三项护理：身体焕亮、水光面部护理与手部护理，并包含同日温泉门票。" />
          <div className="container"><MiniGrid items={signature} /><div className="deal"><b>RM599</b> · 身体焕亮 + 水光面部 + 手部护理 + 同日温泉门票</div><div className="center-cta"><ContactButtons locale="cn" whatsappLabel="WhatsApp 预约" telegramLabel="Telegram 预约" /></div></div>
        </section>
        <section id="beauty-light">
          <SectionHead eyebrow="光电项目" title="三项护理，咨询后定制" sub="每项都会按皮肤与部位定制，现场咨询后确认价格，无隐藏收费。" />
          <div className="container"><div className="fac-grid">{lightTreatments.map(([title, image, desc]) => <article className="fac" key={title}><div className="ph"><img src={`${assetBase}/${image}`} alt={title} /></div><div className="fb"><h3>{title}</h3><p>{desc}</p></div></article>)}</div></div>
        </section>
        <section id="beauty-facial">
          <SectionHead eyebrow="深层护理" title="完整面部管理" sub="从深层清洁到最后修复面膜，一次完整重置面部状态。" />
          <div className="container"><MiniGrid items={facial} /><div className="deal">价格与时段请 WhatsApp 或 Telegram 咨询</div><div className="center-cta"><ContactButtons locale="cn" whatsappLabel="WhatsApp 咨询" telegramLabel="Telegram 咨询" /></div></div>
        </section>
        <section id="beauty-team"><SectionHead eyebrow="你的专员" title="一对一美容专员" /><div className="container"><div className="deal text-left">每项护理都由驻店美容专员一对一完成，光电项目前会先做皮肤评估。</div></div></section>
        <section id="beauty-faq">
          <SectionHead eyebrow="预约前" title="美容部 FAQ" />
          <div className="container"><div className="faqwrap"><div className="faq">{beautyFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="plus" /></summary><div className="a">{answer}</div></details>)}</div><div className="center-cta faq-cta"><p className="fine">还有其他问题？</p><ContactButtons locale="cn" whatsappLabel="WhatsApp 咨询" telegramLabel="Telegram 咨询" /></div></div></div>
        </section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

function TcmPageCn() {
  return (
    <>
      <Header active="TCM" locale="cn" />
      <main>
        <Hero eyebrow="One Spa · 中医部 · 吉隆坡" title={<>中医养生，现在也在 One Spa</>} copy="驻店中医师免费把脉评估，针灸、艾灸、草本泥灸与正骨调理，价格公开，WhatsApp 预约。" image="tcm-hero.jpg?osw=0.9.23" />
        <Chips items={tcmChips} />
        <section id="tcm-pulse"><SectionHead eyebrow="免费体验" title="免费中医把脉" sub="一对一评估体质与当前状态，先评估，再给适合你的调理建议。" /><div className="container"><div className="deal"><b>全身药拓 · 肩颈脊柱调理 · 睡眠压力调理 · 药膳茶饮搭配</b></div><div className="center-cta"><ContactButtons locale="cn" whatsappLabel="预约免费把脉" telegramLabel="Telegram 预约" /></div></div></section>
        <section id="tcm-services"><SectionHead eyebrow="养生项目" title="五项传统护理，先约先得" sub="每个 session 都是一对一；列出的价格就是到店付款价。请 WhatsApp 提前预约。" /><div className="container"><div className="fac-grid">{tcmTreatments.map(([title, image, desc, price]) => <article className="fac" key={title}><div className="ph"><img src={`${assetBase}/${image}`} alt={title} /></div><div className="fb"><h3>{title}</h3><p>{desc}</p>{price ? <p><b>{price}</b></p> : null}</div></article>)}</div></div></section>
        <section id="targeted-care"><SectionHead eyebrow="中医调理 · CHINESE MEDICINE CARE" title="Traditional Chinese Medicine Specialties" sub="由中医师评估后安排的一对一传统调理" /><div className="container"><MiniGrid items={specialties} /><div className="deal">具体项目、时长及适用情况，以中医师现场评估为准</div><div className="center-cta"><ContactButtons locale="cn" whatsappLabel="WhatsApp 预约" telegramLabel="Telegram 预约" /></div></div></section>
        <section id="physician"><SectionHead eyebrow="医师项目" title="中医师操作项目" sub="针灸、小针刀与刺络均由中医师亲自操作，必须先把脉评估。" /><div className="container"><MiniGrid items={physician} /><div className="deal">列出的价格为到店付款价，先免费把脉，适合才继续。</div><div className="center-cta"><ContactButtons locale="cn" whatsappLabel="预约医师项目" telegramLabel="Telegram 预约" /></div></div></section>
        <section id="meridian"><SectionHead eyebrow="招牌项目" title="全身经络药拓调理" sub="以十二经络为引导的全身温热调理，从紧到松，从冷到暖。" /><div className="container"><MiniGrid items={tcmInfo.meridian} /><div className="deal"><b>RM699</b> · 特价 · 到店付款；请 WhatsApp 或 Telegram 提前预约</div><div className="center-cta"><ContactButtons locale="cn" whatsappLabel="WhatsApp 预约" telegramLabel="Telegram 预约" /></div></div></section>
        <section id="intimate"><SectionHead eyebrow="女士专属" title="女性私密养护" sub="干净、专业、完全私密的女性护理。" /><div className="container"><MiniGrid items={tcmInfo.intimate} /><div className="deal">价格与时段请 WhatsApp 或 Telegram 咨询</div><div className="center-cta"><ContactButtons locale="cn" whatsappLabel="WhatsApp 预约" telegramLabel="Telegram 预约" /></div></div></section>
        <section id="tea"><SectionHead eyebrow="药食同源" title="中医草本茶饮" sub="中医部新鲜煮制草本茶，泡汤间隙可到店点，不需要预约。" /><div className="container"><div className="deal">护肝茶 RM29 · 祛湿茶 RM29 · 补肾茶 RM39 · 清肺茶 RM28 · 暖宫茶 RM28</div></div></section>
        <section id="tcm-team"><SectionHead eyebrow="你的调理师" title="中医师与康复调理师" /><div className="container"><div className="deal text-left">中医部由中医师与康复调理师驻店。医师项目会在把脉评估后由中医师亲自操作。</div></div></section>
        <section id="tcm-faq"><SectionHead eyebrow="预约前" title="中医部 FAQ" /><div className="container"><div className="faqwrap"><div className="faq">{tcmFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="plus" /></summary><div className="a">{answer}</div></details>)}</div><div className="center-cta faq-cta"><p className="fine">还有其他问题？</p><ContactButtons locale="cn" whatsappLabel="WhatsApp 咨询" telegramLabel="Telegram 咨询" /></div></div></div></section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

function FaqPageCn() {
  return (
    <>
      <Header active="FAQ" locale="cn" />
      <main><section id="faq"><SectionHead eyebrow="预约前" title="FAQ · One Spa" sub="价格、预约、改期、到店流程都在这里。还有不清楚，直接 WhatsApp 找真人。" /><div className="container"><div className="faqwrap"><div className="faq">{faqRows.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span className="plus" /></summary><div className="a">{answer}</div></details>)}</div></div></div></section></main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

function ContactPageCn() {
  return (
    <>
      <Header active="Contact" locale="cn" />
      <main>
        <section id="contact">
          <SectionHead eyebrow="One Spa · 联系我们" title="来找我们" />
          <div className="container">
            <div className="cinfo-wrap">
              <div className="cinfo"><span className="ck">地址</span><span className="cv">Lot No. 2-53 & 2-56, Level 2, Viva Home Mall, 85, Jalan Loke Yew, Taman Miharja, 55200 Kuala Lumpur</span></div>
              <div className="cinfo"><span className="ck">营业时间</span><span className="cv">每天 24 小时营业</span></div>
              <div className="cinfo"><span className="ck">WhatsApp</span><span className="cv"><a href={whatsappHrefCn} target="_blank" rel="noopener">+60 12-670 2560（点击聊天）</a></span></div>
              <div className="cinfo"><span className="ck">Telegram</span><span className="cv"><a href={telegramHrefCn} target="_blank" rel="noopener">@onespaofficial（点击聊天）</a></span></div>
            </div>
            <div className="btnrow contact-actions">
              <a className="btn" href="https://www.google.com/maps/search/?api=1&query=One%20Spa%20%E5%A3%B9%E5%8F%B7%E6%B1%A4%E6%B3%89&query_place_id=ChIJEa1Xrew3zDEROXX0qPz4IdA" target="_blank" rel="noopener">打开 Google Maps</a>
              <a className="btn line" href="https://waze.com/ul?q=One%20Spa%20Viva%20Home%20Mall" target="_blank" rel="noopener">打开 Waze</a>
            </div>
            <div className="deal contact-note"><b>唯一门店</b> - One Spa 只有这一间门店，位于吉隆坡 Taman Miharja 的 Viva Home Mall Level 2。我们没有分店，请导航到以上地址。</div>
          </div>
        </section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

function PolicyPageCn({ title, eyebrow, rows }: { title: string; eyebrow: string; rows: string[][] }) {
  return (
    <>
      <Header active="FAQ" locale="cn" />
      <main><section><SectionHead eyebrow={eyebrow} title={title} /><div className="container"><div className="knowwrap"><div className="know">{rows.map(([head, body]) => <div className="t" key={head}><span className="dia" /><b>{head}</b>：{body}</div>)}</div></div></div></section></main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

function OnsenPageCn() {
  return (
    <>
      <Header active="Facilities" locale="cn" />
      <main>
        <Hero eyebrow="One Spa · 中式汤泉" title={<>吉隆坡 24 小时中式汤泉</>} copy="热汤、汗蒸、桑拿与冰池交替循环，12 小时内慢慢泡、慢慢休息。" image="hero-onsen-warm.jpg" />
        <section><SectionHead eyebrow="泡法" title="热汤 · 汗蒸 · 冰池" sub="按自己的节奏循环，不赶时间。" /><div className="container"><MiniGrid items={[["热汤", "先让身体慢慢暖起来。"], ["汗蒸或桑拿", "出一身透汗，放松紧绷感。"], ["冰池", "短暂冷却，整个人更清醒。"]]} /></div></section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}

export default async function ChineseSubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");

  if (key === "packages") return <PackagesPageCn />;
  if (key === "facilities") return <FacilitiesPageCn />;
  if (key === "home-massage") return <HomeMassagePageCn />;
  if (key === "beauty") return <BeautyPageCn />;
  if (key === "tcm") return <TcmPageCn />;
  if (key === "faq") return <FaqPageCn />;
  if (key === "contact") return <ContactPageCn />;
  if (key === "wenquan" || key === "onsen-kl") return <OnsenPageCn />;
  if (key === "cancellation-and-refund-policy-on-service") {
    return <PolicyPageCn eyebrow="One Spa · 政策" title="取消与改期" rows={[["免费改期", "到店前 1 天可免费改期，不限次数。"], ["退款", "符合条件的退款会退回原支付方式，通常 14 天内处理。"], ["需要协助", "直接 WhatsApp 联系我们处理。"]]} />;
  }
  if (key === "terms-conditions") {
    return <PolicyPageCn eyebrow="One Spa · 政策" title="条款与细则" rows={[["预约", "所有预约以付款确认或 WhatsApp 确认为准。"], ["价格", "线上显示价格可能未含服务费与 SST，最终价格以下单页面为准。"], ["到店", "请按预约时间到达并出示确认记录。"]]} />;
  }
  if (key === "privacy-policy") {
    return <PolicyPageCn eyebrow="One Spa · 政策" title="隐私政策" rows={[["预约资料", "用于确认订单、联系客户与安排服务。"], ["联系资料", "用于 WhatsApp 沟通与售后协助。"], ["安全", "我们不会在页面展示不必要的个人资料。"]]} />;
  }

  return <FaqPageCn />;
}
