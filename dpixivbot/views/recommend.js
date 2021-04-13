const Telegraf = require("telegraf");
const { newPic } = require("./pic");

const replyMarkup = (ctx) =>
  Telegraf.Extra.markup((markup) =>
    markup.inlineKeyboard([
      [markup.callbackButton(ctx.t("more_recommend"), "moreRecommend")],
      [markup.callbackButton(ctx.t("show_recommend"), "showRecommend")],
    ])
  ).reply_markup;

exports.recommend = (ctx) => {
  return Object.assign(newPic({ ...ctx, no_reply_markup: true }), {
    reply_markup: replyMarkup(ctx.ctx),
  });
};
