const { Telegraf } = require("telegraf")
const { BOT_TOKEN } = require("./config")

const bot = new Telegraf(BOT_TOKEN,
    {
        telegram: {
            webhookReply: false
        }
    })

require('./register')(bot)

module.exports = bot;