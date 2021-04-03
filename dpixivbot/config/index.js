module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    PIC_LOAD_URL: process.env.SITE_URL + '/load',
    PIXIV_PIC_URL: process.env.PIXIV_PIC_URL,
    LANGS: [{ key: "en", text: "🇬🇧 English" }, { key: "ru", text: "🇷🇺 Русский" }],
    MIN_PACK_COUNT: 5,
    MAX_PACK_COUNT: 30,
    PACK_SIZE: 5,
    DEFAULT_CONFIG: {
        description: true,
        group: true,
        count: 5
    },
    DEFAULT_SESSION: process.env.DEFAULT_SESSION,
    REDIS_URL: process.env.REDIS_URL,
    SITE_URL: process.env.SITE_URL
}