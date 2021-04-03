const Telegraf = require('telegraf');

module.exports = ({ ctx, langs, choosedLang }) => {

    return {
        text: ctx.t('choose_lang'),
        reply_markup: Telegraf.Extra.markup((markup) =>
            markup.inlineKeyboard(langs.map((lang) =>
                [markup.callbackButton(lang.text + (choosedLang == lang.key && " ✅" || ""), lang.key)]))).reply_markup
    }

}