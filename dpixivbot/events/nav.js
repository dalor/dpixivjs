const { loadData } = require("../utils/data")
const update = require("../utils/update")
const { originalToRegular } = require("../utils/fixes")

module.exports = ({ bot }) => {
    const showPage = (ctx, data) => ctx.answerCbQuery(`[${data.page + 1}/${data.pageCount}]`)

    bot.action('prev', (ctx) => loadData(ctx, (data) => {
        data.page = data.page - 1 < 0 ? data.pageCount - 1 : data.page - 1
        return update(ctx, data, true).then(showPage(ctx, data))
    }))

    bot.action('next', (ctx) => loadData(ctx, (data) => {
        data.page = data.page + 1 >= data.pageCount ? 0 : data.page + 1
        return update(ctx, data, true).then(showPage(ctx, data))
    }))

    bot.action('preload', (ctx) => loadData(ctx, (data) => {
        if (data.pageCount > 1) {
            const picsToPreload = (new Array(data.pageCount)).fill()
                .map((_, i) => originalToRegular(data.url, i))
                .filter((_, i) => i != data.page)
            data.preload = true
            return Promise.all(picsToPreload
                .map((url) =>
                    ctx.editMessageMedia({
                        type: "photo",
                        media: url,
                        parse_mode: "HTML"
                    }).catch(() => { }))).finally(() => setTimeout(() => update(ctx, data, true), 500))
        }
    }))
}