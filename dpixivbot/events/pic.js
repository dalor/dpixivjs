const { sendPic, sendFull } = require("../utils/send")
const { loadDataFromMessage } = require("../utils/data")

module.exports = ({ bot, config }) => {

    const senPicFromUrl = (ctx) => sendPic(ctx, ctx.match.groups.picId, 0)

    bot.hears(/https?\:\/\/www\.pixiv\.net\/en\/artworks\/(?<picId>[0-9]+)/, senPicFromUrl)

    bot.hears(/https\:\/\/www\.pixiv\.net\/member\_illust\.php\?.*illust\_id\=(?<picId>[0-9]+)/, senPicFromUrl)

    bot.hears(/\/?(pic|start)[ _]?(?<picId>[0-9]+)_?(?<picPage>[0-9]*)/, (ctx) => {
        return sendPic(ctx, ctx.match.groups.picId, ctx.match.groups.picPage || 0)
    })

    const sendPicFromMessage = (ctx, message) => {
        const data = loadDataFromMessage(message)
        if (data && data.id) return sendPic(ctx, data.id, data.page || 0)
    }

    bot.command('pic', (ctx) => {
        if (ctx.message.reply_to_message) {
            return sendPicFromMessage(ctx, ctx.message.reply_to_message)
        }
    })

    bot.command('full', (ctx) => {
        if (ctx.message.reply_to_message) {
            const data = loadDataFromMessage(ctx.message.reply_to_message)
            if (data && data.id) return sendFull(ctx, data.id, { reply: ctx.message.reply_to_message.message_id })
        }
    })

    bot.on('message', (ctx, next) => {
        const sending = sendPicFromMessage(ctx, ctx.message)
        if (sending) return sending.then(() => ctx.deleteMessage())
        else return next()
    })
}