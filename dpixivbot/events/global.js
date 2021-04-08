const { Extra } = require('telegraf');

module.exports = ({ bot, config }) => {

    bot.hears(/\/start session_(.+)/, (ctx) => {
        ctx.session.session = ctx.match[1]
    })

    bot.start((ctx) => ctx.reply('Welcome'))

    bot.command('login', (ctx) => ctx.reply('👇', Extra.markup((m) => m.inlineKeyboard([m.urlButton('Login guide', config.SITE_URL)]))))
}