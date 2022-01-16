module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN || "BOT_TOKEN",
  PIC_LOAD_URL: process.env.SITE_URL + "/load",
  PIXIV_PIC_URL: process.env.PIXIV_PIC_URL,
  LANGS: [
    { key: "en", text: "🇬🇧 English" },
    { key: "ru", text: "🇷🇺 Русский" },
    { key: "uk", text: "🇺🇦 Українська" },
  ],
  MIN_PACK_COUNT: 5,
  MAX_PACK_COUNT: 30,
  PACK_SIZE: 5,
  DEFAULT_CONFIG: {
    description: true,
    group: true,
    count: 5,
  },
  DEFAULT_SESSION: process.env.DEFAULT_SESSION,
  REDIS_URL: process.env.REDISCLOUD_URL,
  SITE_URL: process.env.SITE_URL,
  MIN_SIMILARITY: 80,
  DEFAULT_PREVIEW_PIC_URL: "https://i.pximg.net/img-master/img/2021/03/11/17/20/48/88371356_p0_master1200.jpg",
};
