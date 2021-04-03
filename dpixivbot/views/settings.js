const Telegraf = require('telegraf');
const { dataUrl } = require("../utils/data");
const { returnToHtml } = require("../utils/fixes")
const { PIC_LOAD_URL } = require("../config")

const replyMarkup = (data, ctx) => Telegraf.Extra.markup((markup) =>
    markup.inlineKeyboard(
        [
            [
                markup.callbackButton(ctx.t('with_description'), 'withoutDescriptionSettings', !data.description),
                markup.callbackButton(ctx.t('without_description'), 'withDescriptionSettings', data.description),
                markup.callbackButton(ctx.t('in_group'), 'byOneSettings', !data.group),
                markup.callbackButton(ctx.t('by_one'), 'inGroupSettings', data.group)
            ],
            [
                markup.callbackButton(ctx.t('minus'), 'minusSettings'),
                markup.callbackButton(ctx.t('plus'), 'plusSettings')
            ],
            [
                markup.callbackButton(ctx.t('save'), 'saveSettings')
            ]
        ]
    )).reply_markup

exports.newSetting = ({ ctx, data }) => {

    return {
        text: ctx.t('settings_text') + `<a href="${dataUrl(data, PIC_LOAD_URL)}">.</a>\n${ctx.t('similar_count')} <b>${data.count}</b>`,
        reply_markup: replyMarkup(data, ctx)
    }

}

exports.updateSettings = ({ data, text, ctx }) => {

    return {
        text: returnToHtml(text.text, text.entities),
        reply_markup: replyMarkup(data, ctx)
    }
}