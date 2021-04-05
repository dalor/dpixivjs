const { sendPic, sendFull } = require("../utils/send")
const { loadDataFromMessage } = require("../utils/data")
const saucenao = require("../utils/saucenao")

module.exports = ({ bot, config }) => {

    const sendPicFromUrl = (ctx) => sendPic(ctx, ctx.match.groups.picId, 0, { description: true })

    bot.hears(/https?\:\/\/www\.pixiv\.net\/en\/artworks\/(?<picId>[0-9]+)/, sendPicFromUrl)

    bot.hears(/https\:\/\/www\.pixiv\.net\/member\_illust\.php\?.*illust\_id\=(?<picId>[0-9]+)/, sendPicFromUrl)

    bot.hears(/\/?(pic|start)[ _]?(?<picId>[0-9]+)_?(?<picPage>[0-9]*)/, (ctx) => {
        return sendPic(ctx, ctx.match.groups.picId, ctx.match.groups.picPage || 0, { description: true })
    })

    const sendPicFromMessage = (ctx, message) => {
        const data = loadDataFromMessage(message)
        if (data && data.id) return sendPic(ctx, data.id, data.page || 0, { description: true })
    }

    const recognizeAndSend = (ctx, message) =>
        bot.telegram.getFileLink(message.photo[message.photo.length - 1]?.file_id)
            .then(saucenao)
            .then(pics => {
                if (pics && pics[0]) {
                    if (pics[0].similarity >= config.MIN_SIMILARITY) {
                        return sendPic(ctx, pics[0].id, 0, { reply: message.message_id, description: true })
                    } else {
                        return ctx.reply(ctx.t('low_simularity'))
                    }
                } else {
                    return ctx.reply(ctx.t('saucenao_error'))
                }
            })

    bot.command('pic', (ctx) => {
        if (ctx.message.reply_to_message) {
            return sendPicFromMessage(ctx, ctx.message.reply_to_message) || recognizeAndSend(ctx, ctx.message.reply_to_message)
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
        else if (ctx.message.photo) {
            return recognizeAndSend(ctx, ctx.message)
        }
        else return next()
    })
}