const { recommender } = require("../../api")
const { auth } = require("../utils/auth");
const { sendPics } = require("../utils/send")

module.exports = ({ config, bot }) => {

    bot.command('recommends', auth(async (ctx, session) => {
        const ids = (await recommender({session, count: ctx.session.count || config.DEFAULT_CONFIG.count}))?.ids
        const loading = await ctx.reply(ctx.t('loading'))
        await sendPics(ctx, ids, ctx.session)
        return ctx.deleteMessage(loading.message_id);
    }))

}