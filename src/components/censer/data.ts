export type ModeId = "incense" | "brew" | "warm";

export const MODES: Record<ModeId, { name: string; en: string; min: number; max: number; def: number; desc: string; mood: string }> = {
  incense: {
    name: "熏香", en: "INCENSE", min: 50, max: 120, def: 90,
    desc: "用于檀香、沉香、线香等多种香材。通过温度设定，探索不同香材的气息变化。",
    mood: "朱砂 · 香木 · 静",
  },
  brew: {
    name: "煮茶", en: "BREW", min: 80, max: 100, def: 95,
    desc: "适用于绿茶、红茶、花茶等茶材，帮助释放茶香层次。",
    mood: "釉蓝 · 茶香 · 醒",
  },
  warm: {
    name: "温茶", en: "WARM", min: 60, max: 80, def: 70,
    desc: "用于茶杯温热与保温，让茶香在适宜温度中停留。",
    mood: "琥珀 · 温润 · 缓",
  },
};

export const TIMERS = [0.5, 1, 2, 4, 8, 12];

export type SpecimenId = "tea" | "petal" | "wood";
export const SPECIMENS: Record<SpecimenId, { name: string; descriptor: string; no: string; mode: ModeId; text: string }> = {
  tea: {
    name: "茶叶", descriptor: "TEA LEAF / 茶材", no: "INDEX 01", mode: "brew",
    text: "茶叶标本。产品资料列出绿茶、红茶、花茶等茶材，可切换至煮茶模式；具体使用方式以产品说明为准。",
  },
  petal: {
    name: "花草", descriptor: "PETAL / 花草", no: "INDEX 02", mode: "brew",
    text: "花草茶材样本。作为植物标本视觉索引，展示花茶这一使用方向；具体适用材料以产品说明为准。",
  },
  wood: {
    name: "香木", descriptor: "AROMA MATERIAL / 香材", no: "INDEX 03", mode: "incense",
    text: "香材标本。产品资料列出檀香、沉香、线香等多种香材，可切换至熏香模式。",
  },
};

export type PartId = "lid" | "filter" | "chamber" | "body" | "ptc" | "mcu" | "base";
export const PARTS: { id: PartId; name: string; en: string; spec: string; text: string }[] = [
  { id: "lid", name: "镂空顶盖", en: "PIERCED LID", spec: "可拆卸 · 陶瓷材质", text: "陶瓷顶盖可拆卸，镂空结构让香气与热气逸散。" },
  { id: "filter", name: "滤网", en: "FILTER MESH", spec: "陶瓷滤网 / 不锈钢网架", text: "网架用于承放茶叶或香材，并帮助分离香灰。" },
  { id: "chamber", name: "香材仓", en: "MATERIAL CHAMBER", spec: "放置香料 / 茶材", text: "用于放置香料或茶材，对应熏香与煮茶等使用方式。" },
  { id: "body", name: "陶瓷炉体", en: "CERAMIC BODY", spec: "奶白釉面质感", text: "奶白色陶瓷外壳，圆润器型与胡桃木底座形成材质对比。" },
  { id: "ptc", name: "温控发热盘", en: "PTC HEATING PLATE", spec: "PTC 陶瓷发热体", text: "隐形式温控发热盘，产品资料说明采用 PTC 陶瓷发热体。" },
  { id: "mcu", name: "MCU 主控芯片", en: "MCU CONTROLLER", spec: "主控 / 温度控制", text: "主控芯片用于温度控制与安全保护；此处为结构示意，不展示未经确认的芯片参数。" },
  { id: "base", name: "胡桃木底座", en: "WALNUT BASE", spec: "触控面板 · 数字显示", text: "胡桃木底座整合触控与数显界面，用于选择模式、温度与定时。" },
];

export const STEPS = [
  { no: "01", name: "放料", en: "LOAD", text: "打开顶盖，在网架上放置茶叶或香材；温茶模式可在顶部放置茶杯。" },
  { no: "02", name: "触控", en: "TOUCH", text: "在底座触控屏上选择模式，并设定温度与定时。" },
  { no: "03", name: "享受", en: "ENJOY", text: "产品自动加热，到达设定时间后断电，享受茶香与温热体验。" },
];
