const { dataUrl } = require("../utils/data");
const { updatePic, updateText } = require("../views/pic")
const { changePage } = require("./fixes")
const { PIC_LOAD_URL } = require("../config")

module.exports = (ctx, data, changeMedia) => {
    if (ctx.entity) {
        ctx.entity.url = dataUrl(data, PIC_LOAD_URL)
        if (ctx.callbackQuery.message.text) {
            const { text, reply_markup } = updateText({
                ctx,
                text: {
                    text: ctx.callbackQuery.message.text,
                    entities: ctx.callbackQuery.message.entities
                },
                data
            })
            return ctx.editMessageText(text, { reply_markup, parse_mode: "HTML" })
        } else if (ctx.callbackQuery.message.caption) {
            if (changeMedia) {
                data.url = changePage(data.url, data.page)
                ctx.callbackQuery.message.caption = ctx.callbackQuery.message.caption.replace(/\([0-9]+\/[0-9]+\)/, `(${data.page + 1}/${data.pageCount})`)
            }
            const { photo, caption, reply_markup } = updatePic({
                ctx,
                caption: {
                    text: ctx.callbackQuery.message.caption,
                    entities: ctx.callbackQuery.message.caption_entities
                },
                data
            })
            if (changeMedia) {
                return ctx.editMessageMedia({
                    type: "photo",
                    media: photo,
                    caption: caption
                }, { reply_markup, parse_mode: "HTML" })
            } else {
                return ctx.editMessageCaption(caption, { reply_markup, parse_mode: "HTML" })
            }
        }
    }
}