module.exports = ({ bot }) => {

    bot.hears(/\/start session_(.+)/, (ctx) => {
        ctx.session.session = ctx.match[1]
    })

    bot.start((ctx) => ctx.reply('Welcome'))
}