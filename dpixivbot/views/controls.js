const Telegraf = require('telegraf');
const { PIXIV_PIC_URL } = require("../config")

module.exports = (data, ctx) => Telegraf.Extra.markup((markup) => markup.inlineKeyboard([
    [
        markup.callbackButton(ctx.t('prev'), 'prev', data.pageCount <= 1),
        markup.callbackButton(ctx.t('next'), 'next', data.pageCount <= 1)
    ],
    [
        markup.urlButton(ctx.t('source'), PIXIV_PIC_URL + data.id),
        markup.callbackButton(ctx.t('download_as_file'), 'file'),
        markup.switchToChatButton(ctx.t('share'), data.page > 0 ? `${data.id}_${data.page}` : `${data.id}`),
        markup.callbackButton(ctx.t('hide'), 'hide', !data.show), markup.callbackButton('🔽', 'show', data.show)
    ],
    [
        markup.callbackButton(ctx.t('preload'), 'preload', !data.show || data.choosed || data.pageCount <= 1),
        markup.callbackButton(ctx.t('full'), 'full', !data.show || data.choosed || data.pageCount <= 1)
    ],
    [
        markup.callbackButton(ctx.t('similar_menu'), 'similar', !data.show || data.choosed),
        markup.callbackButton(ctx.t('sender_menu'), 'sender', !data.show || data.choosed)
    ]
].concat((data.show && data.choosed == "similar" && similarMenu(data, markup, ctx))
    || (data.show && data.choosed == "sender" && senderMenu(data, markup, ctx)) || [])
)
).reply_markup

const similarMenu = (data, markup, ctx) => (
    [
        [
            markup.callbackButton(ctx.t('back_btn'), 'back')
        ],
        [
            markup.callbackButton(ctx.t('with_description'), 'withoutDescription', !data.description),
            markup.callbackButton(ctx.t('without_description'), 'withDescription', data.description),
            markup.callbackButton(ctx.t('in_group'), 'byOne', !data.group),
            markup.callbackButton(ctx.t('by_one'), 'inGroup', data.group)
        ],
        [
            markup.callbackButton(ctx.t('minus'), 'minus'),
            markup.callbackButton(`⬇️ ${data.count}`, 'similarSend'),
            markup.callbackButton(ctx.t('plus'), 'plus')
        ]
    ])

const senderMenu = (data, markup, ctx) => (
    [
        [
            markup.callbackButton(ctx.t('back_btn'), 'back')
        ]
    ].concat(ctx.session.channels ? ctx.session.channels.map((channel) => [markup.callbackButton(channel.title, `sendToChannel ${channel.id}`)]) : [])
)