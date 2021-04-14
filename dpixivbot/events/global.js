const { Extra } = require("telegraf");

module.exports = ({ bot, config }) => {
  bot.start((ctx) => ctx.reply("Welcome"));
};
