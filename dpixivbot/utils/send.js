const { info, shortGroupInfo } = require("../../api")
const { newPic, channelPic } = require("../views/pic")
const { DEFAULT_CONFIG, DEFAULT_SESSION, PACK_SIZE } = require("../config")

exports.sendPic = (ctx, id, page) => info({ id }).then((pic) => {
    return sendOne(ctx, pic, page)
})

exports.sendPics = (ctx, ids, data) =>
    shortGroupInfo({ ids, session: ctx.session.session || DEFAULT_SESSION }).then((pics) =>
        data && data.group ?
            Promise.all(splitToPacks(pics, data && data.size || PACK_SIZE).map((pack) =>
                sendPack(ctx, pack, data))) :
            sendPackByOne(ctx, pics, data)
    )

exports.sendOneToChannel = (ctx, channelId, data) => info({ id: data.id }).then((pic) => {
    const { photo, reply_markup } = channelPic({ pic, data, ctx })
    return ctx.telegram.sendPhoto(channelId, photo, { reply_markup })
})

exports.sendFull = (ctx, id, data) => info({ id }).then((pic) => {
    const picsCtx = (new Array(pic.pageCount)).fill().map((_, i) => picCtx(ctx, pic, i, true, true))
    return Promise.all(splitToPacks(picsCtx, 10).map((pics) =>
        ctx.replyWithMediaGroup(pics.map((pic, i) => ({
            type: 'photo',
            media: pic.photo,
            caption: data && !data.description || i ? undefined : pic.caption,
            parse_mode: "HTML"
        })), { reply_to_message_id: data && data.reply })))
})

const picCtx = (ctx, pic, page, no_reply_markup, no_page) => newPic({
    ctx,
    pic,
    data: {
        page: page > 0 && page < pic.pageCount && page || 0,
        pageCount: pic.pageCount,
        url: pic.urls.original,
        id: pic.id,
        description: ctx.session.description !== undefined ? ctx.session.description : DEFAULT_CONFIG.description,
        group: ctx.session.group !== undefined ? ctx.session.group : DEFAULT_CONFIG.group,
        count: ctx.session.count !== undefined ? ctx.session.count : DEFAULT_CONFIG.count
    },
    no_reply_markup,
    no_page
})

const sendOne = (ctx, pic, page, data) => {
    const { photo, caption, reply_markup } = picCtx(ctx, pic, page)
    return ctx.replyWithPhoto(photo, {
        caption: data && !data.description ? undefined : caption,
        reply_markup: data && !data.description ? undefined : reply_markup,
        reply_to_message_id: data && data.reply,
        parse_mode: "HTML"
    })
}

const sendPack = (ctx, pics, data) => {
    const picsCtx = pics.map((pic) => picCtx(ctx, pic, 0))
    return ctx.replyWithMediaGroup(picsCtx.map(pic => ({
        type: 'photo',
        media: pic.photo,
        caption: data && !data.description ? undefined : pic.caption,
        parse_mode: "HTML"
    })),
        {
            reply_to_message_id: data && data.reply
        }).catch(() => sendPackByOne(ctx, pics, data))
}

const sendPackByOne = (ctx, pics, data) => Promise.all(pics.map((pic) => sendOne(ctx, pic, 0, data)))

const splitToPacks = (pics, pack_size) => {
    const packs = pics.reduce((packs, pic, i) => {
        packs.lastPack.push(pic)
        if (i % pack_size == pack_size - 1) {
            packs.packs.push(packs.lastPack)
            packs.lastPack = []
        }
        return packs
    }, { packs: [], lastPack: [] })
    if (packs.lastPack.length)
        return packs.packs.concat([packs.lastPack])
    else
        return packs.packs
}
