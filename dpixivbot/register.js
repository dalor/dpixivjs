const config = require("./config")
const translator = require("./translator")
const RedisSession = require('telegraf-session-redis')

module.exports = (bot, db) => {

    const session = new RedisSession({
        store: {
            url: config.REDIS_URL
        },
    })

    bot.use(session)

    bot.telegram.getMe().then((botInfo) => bot.context.botInfo = botInfo)

    bot.use((ctx, next) => {
        ctx.t = (word) => translator(word, ctx.session?.lang || "en")
        return next()
    })

    bot.catch((err, ctx) => {
        console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })

    require("./events")({
        bot,
        config,
        db
    })

    bot.telegram.setWebhook(config.SITE_URL + '/' + bot.token)
}