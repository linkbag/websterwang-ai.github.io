// Presentation-only copy and media. Product claims and availability live in content.mjs.
export const presentation = {
  en: {
    insideWork: "A LOOK INSIDE THE WORK",
    takeLook: "Take a look",
    previewSelect: "Choose a project preview",
    identities: ["Neuroscience PhD", "Biopharma strategist", "Hands-on AI builder"],
    disciplines: ["Science", "Strategy", "Software", "Learning"],
    projects: "projects",
    closerLook: "A CLOSER LOOK",
    insideProduct: "Inside the product.",
    enlarge: "Enlarge image",
    demo: "PRODUCT FILM",
    theIdea: "THE IDEA",
    capabilities: "IN PRACTICE",
    nextStep: "THE NEXT STEP",
  },
  zh: {
    insideWork: "先看几个正在做的项目",
    takeLook: "了解项目",
    previewSelect: "选择项目预览",
    identities: ["神经科学博士", "生物医药战略", "动手做 AI 产品"],
    disciplines: ["科学", "战略", "编程", "学习"],
    projects: "个项目",
    closerLook: "再近一点看",
    insideProduct: "界面与细节",
    enlarge: "放大图片",
    demo: "产品演示",
    theIdea: "出发点",
    capabilities: "实际用途",
    nextStep: "一起参与",
  },
};

const image = (name) => `/assets/showcase/${name}.webp`;
const bilingual = (src) => ({en:src, zh:src});
const shot = (name, en, zh) => ({
  src:image(name),
  width:name.startsWith("tap-") ? 720 : 1265,
  height:name.startsWith("tap-") ? 1600 : 712,
  caption:{en,zh},
});

export const visuals = {
  "indie-games": {
    gallery: [{
      src: { en: image("lantern-writing-en"), zh: image("lantern-writing-zh") },
      width: 1400, height: 790,
      caption: {
        en: "The beginner writing tool gives you a field for each choice and a space to write what happens next.",
        zh: "在新手写作工具里填入两个选项，再分别写下玩家做出选择后的结局。",
      },
    }],
  },
  aperture: {
    cover: bilingual(image("aperture-copilot-edit")),
    gallery: [
      shot("aperture-copilot-cohorts", "The copilot separates the full dose group from the second-line subset.", "AI 助手区分了整个剂量组和二线治疗亚组。"),
      shot("aperture-copilot-source", "Inspect the study passage behind the reported response rate.", "核查缓解率对应的研究原文。"),
      shot("aperture-copilot-brief", "The shared dashboard carries the analyst-reviewed brief and its study links.", "共享看板保留了复核后的简报和研究链接。"),
    ],
  },
  siteselection: {cover:bilingual(image("siteselection-demo"))},
  neuroaxis: {cover:bilingual(image("neuroaxis"))},
  diffusionatlas: {cover:bilingual(image("diffusionatlas"))},
  "us-stockselector": {cover:bilingual(image("us-stockselector"))},
  "a-share-stockselector": {cover:bilingual(image("ashare-stockselector"))},
  "dsh-ai-swarm": {cover:bilingual(image("dsh-ai-swarm"))},
  peervine: {cover:{en:image("peervine-en"), zh:image("peervine-zh")}},
  gradchoice: {cover:{en:image("gradchoice-en"), zh:image("gradchoice-zh")}},
  "tap-to-learn": {
    cover:bilingual(image("tap-lookup")),
    secondary:image("tap-example"),
    gallery: [
      shot("tap-example", "Look up a word without leaving the page.", "不离开正在读的页面，随手查词。"),
      shot("tap-flashcard", "Turn the words you find into flashcards.", "遇到的生词，接着用卡片复习。"),
      shot("tap-quiz", "Practice with three quiz formats.", "用三种题型巩固记忆。"),
    ],
  },
};
