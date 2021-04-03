const { loadData, dataUrl } = require("../utils/data")
const { newSetting, updateSettings } = require("../views/settings")

module.exports = ({ config, bot }) => {

    const update = (ctx, data, prevNumber) => {
        if (ctx.entity) {
            ctx.entity.url = dataUrl(data, config.PIC_LOAD_URL)
            const { text, reply_markup } = updateSettings({
                ctx,
                text: {
                    text: prevNumber ? ctx.callbackQuery.message.text.replace(prevNumber, data.count) : ctx.callbackQuery.message.text,
                    entities: ctx.callbackQuery.message.entities
                },
                data
            })
            return ctx.editMessageText(text, { reply_markup, parse_mode: "HTML" })
        }
    }

    bot.action('withDescriptionSettings', (ctx) => loadData(ctx, (data) => {
        data.description = true
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('with_description_alert')))
    }))

    bot.action('withoutDescriptionSettings', (ctx) => loadData(ctx, (data) => {
        data.description = false
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('without_description_alert')))
    }))

    bot.action('inGroupSettings', (ctx) => loadData(ctx, (data) => {
        data.group = true
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('in_group_alert')))
    }))

    bot.action('byOneSettings', (ctx) => loadData(ctx, (data) => {
        data.group = false
        return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t('by_one_alert')))
    }))

    bot.action('plusSettings', (ctx) => loadData(ctx, (data) => {
        const prevNumber = data.count
        data.count = data.count + config.PACK_SIZE <= config.MAX_PACK_COUNT ? data.count + config.PACK_SIZE : config.MAX_PACK_COUNT
        if (data.count != prevNumber) return update(ctx, data, prevNumber).then(() => ctx.answerCbQuery(''))
        else ctx.answerCbQuery(ctx.t('no_more'))
    }))

    bot.action('minusSettings', (ctx) => loadData(ctx, (data) => {
        const prevNumber = data.count
        data.count = data.count - config.PACK_SIZE >= config.MIN_PACK_COUNT ? data.count - config.PACK_SIZE : config.MIN_PACK_COUNT
        if (data.count != prevNumber) return update(ctx, data, prevNumber).then(() => ctx.answerCbQuery(''))
        else ctx.answerCbQuery(ctx.t('no_less'))
    }))

    bot.command('settings', (ctx) => {
        const { text, reply_markup } = newSetting({
            ctx,
            data: {
                description: ctx.session.description || config.DEFAULT_CONFIG.description,
                group: ctx.session.group || config.DEFAULT_CONFIG.group,
                count: ctx.session.count || config.DEFAULT_CONFIG.count
            }
        })
        return ctx.reply(text, { reply_markup, parse_mode: "HTML" })
    })

    bot.action('saveSettings', (ctx) => loadData(ctx, (data) => {
        Object.assign(ctx.session, data)
        return ctx.answerCbQuery(ctx.t('saved'))
    }))

}