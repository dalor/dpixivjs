const { loadData } = require("../utils/data")
const update = require("../utils/update")
const { sendFull } = require("../utils/send")

module.exports = ({ bot }) => {

    bot.action('show', (ctx) => loadData(ctx, (data) => {
        data.show = true
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('shown')))
    }))

    bot.action('hide', (ctx) => loadData(ctx, (data) => {
        data.show = false
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('hidden')))
    }))

    bot.action('file', (ctx) => loadData(ctx, (data) => {
        return ctx.answerCbQuery(ctx.t('loading...')).then(() => ctx.replyWithDocument(data.url, { reply_to_message_id: ctx.callbackQuery.message.message_id }))
    }))

    bot.action('similar', (ctx) => loadData(ctx, (data) => {
        data.choosed = "similar"
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('similar_menu')))
    }))

    bot.action('sender', (ctx) => loadData(ctx, (data) => {
        data.choosed = "sender"
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('sender_menu')))
    }))

    bot.action('back', (ctx) => loadData(ctx, (data) => {
        data.choosed = null
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('to_main')))
    }))

    bot.action('full', (ctx) => loadData(ctx, (data) => {
        return sendFull(ctx, data.id, Object.assign(data, { reply: ctx.callbackQuery.message.message_id }))
            .then(() => ctx.answerCbQuery(ctx.t('was_sent')))
    }))
}