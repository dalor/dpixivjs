const chooseLangView = require("../views/chooseLang")

module.exports = ({ bot, config }) => {

    for (let lang of config.LANGS) {
        bot.action(lang.key, (ctx) => {
            if (ctx.session.lang !== lang.key) {
                ctx.session.lang = lang.key
                const { text, reply_markup } = chooseLangView({ ctx, langs: config.LANGS, choosedLang: lang.key })
                return ctx.editMessageText(text, { reply_markup })
            }
            else return ctx.answerCbQuery(ctx.t('already_choosed'))
        })
    }

    const chooseLang = (ctx) => {
        const { text, reply_markup } = chooseLangView({ ctx, langs: config.LANGS, choosedLang: ctx.session.lang })
        return ctx.reply(text, { reply_markup })
    }

    bot.use((ctx, next) => {
        if (ctx.session && !ctx.session.lang) {
            return chooseLang(ctx).then(() => next())
        } else return next()
    })

    bot.command('language', chooseLang)


}