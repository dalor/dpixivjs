const { loadData } = require("../utils/data");
const { ugoiraMeta } = require("../../api");
const { UGOIRA_LOAD_URL } = require("../../config");
const update = require("../utils/update");
const { sendFull } = require("../utils/send");

module.exports = ({ bot }) => {
  bot.action(
    "show",
    loadData((ctx, data) => {
      data.show = true;
      return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t("shown")));
    })
  );

  bot.action(
    "hide",
    loadData((ctx, data) => {
      data.show = false;
      return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t("hidden")));
    })
  );

  bot.action(
    "file",
    loadData((ctx, data) => {
      return ctx
        .answerCbQuery(ctx.t("loading"))
        .then(() => {
          if (data.ugoira) {
            return ugoiraMeta({
              id: data.id,
              session: ctx.session.session || config.DEFAULT_SESSION
            }).then(({ averageDelay, original }) => {
              return ctx.replyWithDocument(`${UGOIRA_LOAD_URL}?url=${original}&delay=${averageDelay}&type=mp4`, {
                reply_to_message_id: ctx.callbackQuery.message.message_id,
              })
            })
          } else {
            return ctx.replyWithDocument(data.url, {
              reply_to_message_id: ctx.callbackQuery.message.message_id,
            })
          }
        }
        );
    })
  );

  bot.action(
    "similar",
    loadData((ctx, data) => {
      data.choosed = "similar";
      return update(ctx, data).then(() =>
        ctx.answerCbQuery(ctx.t("similar_menu"))
      );
    })
  );

  bot.action(
    "sender",
    loadData((ctx, data) => {
      data.choosed = "sender";
      return update(ctx, data).then(() =>
        ctx.answerCbQuery(ctx.t("sender_menu"))
      );
    })
  );

  bot.action(
    "back",
    loadData((ctx, data) => {
      data.choosed = null;
      return update(ctx, data).then(() => ctx.answerCbQuery(ctx.t("to_main")));
    })
  );

  bot.action(
    "full",
    loadData((ctx, data) => {
      return sendFull(
        ctx,
        data.id,
        Object.assign(data, { reply: ctx.callbackQuery.message.message_id })
      ).then(() => ctx.answerCbQuery(ctx.t("was_sent")));
    })
  );
};
