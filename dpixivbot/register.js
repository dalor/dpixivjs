const config = require("../config")
const path = require('path')
const RedisSession = require('telegraf-session-redis')
const TelegrafI18n = require('telegraf-i18n')

module.exports = (bot) => {

    const session = new RedisSession({
        store: {
            url: config.REDIS_URL
        },
    })

    bot.use(session)

    bot.telegram.getMe().then((botInfo) => bot.context.botInfo = botInfo)
    
    const i18n = new TelegrafI18n({
        directory: path.resolve(__dirname, '../locales')
    })

    bot.use((ctx, next) => {
        ctx.t = (word, data) =>  i18n.t(ctx?.session?.lang || 'en', word, data)
        return next()
    })

    bot.catch((err, ctx) => {
        console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
    })

    require("./events")({
        bot,
        config
    })

    bot.telegram.setWebhook(config.SITE_URL + '/' + bot.token)
}