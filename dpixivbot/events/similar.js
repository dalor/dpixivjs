const { loadData } = require("../utils/data")
const update = require("../utils/update")
const { similar } = require("../../api")
const { sendPics } = require("../utils/send")

module.exports = ({ config, bot }) => {

    bot.action('withDescription', (ctx) => loadData(ctx, (data) => {
        data.description = true
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('with_description_alert')))
    }))

    bot.action('withoutDescription', (ctx) => loadData(ctx, (data) => {
        data.description = false
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('without_description_alert')))
    }))

    bot.action('inGroup', (ctx) => loadData(ctx, (data) => {
        data.group = true
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('in_group_alert')))
    }))

    bot.action('byOne', (ctx) => loadData(ctx, (data) => {
        data.group = false
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('by_one_alert')))
    }))

    bot.action('plus', (ctx) => loadData(ctx, (data) => {
        data.count = data.count + config.PACK_SIZE <= config.MAX_PACK_COUNT ? data.count + config.PACK_SIZE : config.MAX_PACK_COUNT
        return update(ctx, data).catch(() => ctx.answerCbQuery(ctx.t('no_more'))).then(() => ctx.answerCbQuery(''))
    }))

    bot.action('minus', (ctx) => loadData(ctx, (data) => {
        data.count = data.count - config.PACK_SIZE >= config.MIN_PACK_COUNT ? data.count - config.PACK_SIZE : config.MIN_PACK_COUNT
        return update(ctx, data).catch(() => ctx.answerCbQuery(ctx.t('no_less'))).then(() => ctx.answerCbQuery(''))
    }))

    bot.action('similarSend', (ctx) => loadData(ctx, (data) => {
        return similar({
            id: data.id,
            session: ctx.session.session || config.DEFAULT_SESSION,
            limit: 1
        }).then((ids) => {
            const end = data.end || 0
            if (ids.length >= end) {
                data.end = end + data.count
                return update(ctx, data).then(() =>
                    ctx.answerCbQuery(ctx.t('sending_similar')))
                    .then(() =>
                        sendPics(ctx, ids.ids.slice(end, end + data.count), Object.assign(data, { reply: ctx.callbackQuery.message.message_id }))
                            .catch(() =>
                                ctx.answerCbQuery(ctx.t('error_occurred'))
                                    .catch(() =>
                                        ctx.reply(ctx.t('error_occurred'))))
                    )
            } else return ctx.answerCbQuery(ctx.t('no_more_similar'))
        })
    }))

}