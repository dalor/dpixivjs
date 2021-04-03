const { loadData } = require("../utils/data")
const { sendOneToChannel } = require("../utils/send")
const update = require("../utils/update")

module.exports = ({ bot }) => {

    const findUser = (ulist, id) => {
        for (let user of ulist) {
            if (user.user.id == id) return user
        }
        return {}
    }

    const findChannel = (clist, id) => {
        for (let channel of clist) {
            if (channel.id == id) return channel
        }
    }

    bot.on('message', (ctx, next) => {
        const forward_from = ctx.message.forward_from_chat || ctx.message.forward_from
        if (forward_from && forward_from.type == 'channel') {
            return bot.telegram.getChatAdministrators(forward_from.id).then((data) => {
                const user = findUser(data, ctx.from.id)
                if ((user.can_post_messages || user.status == 'creator') && findUser(data, ctx.botInfo.id).can_post_messages) {
                    if (!ctx.session.channels) ctx.session.channels = []
                    const channel = findChannel(ctx.session.channels, forward_from.id)
                    if (!channel) {
                        ctx.session.channels.push({
                            id: forward_from.id,
                            title: forward_from.title
                        })
                        return ctx.reply(ctx.t('added_channel'))
                    } else if (channel.title != forward_from.title) {
                        channel.title = forward_from.title
                        return ctx.reply(ctx.t('updated_channel'))
                    }
                }
            }).catch(() => next())
        }
        return next()
    })

    bot.action(/sendToChannel (?<channelId>[0-9\-]+)/, (ctx) => loadData(ctx, (data) => {
        const channel = findChannel(ctx.session.channels, ctx.match.groups.channelId)
        if (channel) {
            return sendOneToChannel(ctx, channel.id, data).then(() =>
                ctx.answerCbQuery(ctx.t('was_sent'))).catch(() => {
                    ctx.session.channels = ctx.session.channels.filter((ch) => ch.id !== channel.id)
                    return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('cant_send_to_channel')))
                })
        }
    }))
}