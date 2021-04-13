const url_ = require("url")
const querystring = require('querystring');

const renderData = (obj) => (new Buffer.from(JSON.stringify(obj))).toString('base64')

exports.renderData = renderData;

const parseData = (str) => JSON.parse((new Buffer.from(str, 'base64')).toString())

exports.parseData = parseData

const data_attr = 'data'

exports.dataUrl = (data, url) => (url + "?" + querystring.stringify({ [data_attr]: renderData(data) }))

const findDataUrl = (caption_entities) => {
    for (let entity of caption_entities) {
        if (entity.type === "text_link") {
            const url = url_.parse(entity.url, true)
            if (url.query[data_attr]) {
                return { url, entity }
            }
        }
    }
}

exports.loadDataFromMessage = (message) => {
    if (message.caption_entities || message.entities) {
        const pair = findDataUrl(message.caption_entities || message.entities)
        if (pair) {
            return parseData(pair.url.query.data)
        }
    }
}

exports.loadData = (callback) => (ctx) => {
    const pair = findDataUrl(ctx.callbackQuery.message.caption_entities || ctx.callbackQuery.message.entities)
    if (pair) {
        ctx.entity = pair.entity
        return callback(ctx, parseData(pair.url.query[data_attr]))
    }
}