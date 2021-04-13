const { loadData } = require("../utils/data");
const { recommender, info } = require("../../api");
const { auth } = require("../utils/auth");
const { recommend } = require("../views/recommend");
const { sendPic } = require("../utils/send");

module.exports = ({ bot }) => {
  const loadOne = (session) =>
    recommender({ session, count: 1 }).then(({ ids }) => ids?.[0]);

  const startData = (session) =>
    recommender({ session, count: 2 }).then(
      ({ ids }) =>
        ids && {
          id: ids[0],
          next: { id: ids[1] },
        }
    );

  bot.command(
    "recommend",
    auth(async (ctx, session) => {
      const loading = await ctx.reply(ctx.t("loading"));
      const data = await startData(session);
      if (data) {
        const pic = await info({ id: data.id });
        data.pageCount = pic.pageCount;
        const { photo, caption, reply_markup } = recommend({ pic, ctx, data });
        await ctx.replyWithPhoto(photo, {
          caption,
          reply_markup,
          parse_mode: "HTML",
        });
        return ctx.deleteMessage(loading.message_id);
      }
    })
  );

  bot.action(
    "showRecommend",
    auth(
      loadData(async (ctx, data) => {
        ctx.answerCbQuery(ctx.t("loading"));
        return sendPic(ctx, data.id, 0, {
          description: true,
          reply: ctx.callbackQuery.message.message_id,
        });
      })
    )
  );

  bot.action(
    "moreRecommend",
    auth(
      loadData(async (ctx, data) => {
        ctx.answerCbQuery(ctx.t("loading"));
        if (data.next?.id) {
          data.id = data.next.id;
          data.next = null;
        } else {
          const nData = await startData(ctx.session.session);
          if (nData) {
            Object.assign(data, nData);
          } else {
            return null;
          }
        }
        const pic = await info({ id: data.id });
        data.pageCount = pic.pageCount;
        const { photo, caption, reply_markup } = recommend({ pic, ctx, data });
        await ctx.editMessageMedia(
          {
            type: "photo",
            media: photo,
            caption: caption,
          },
          { reply_markup, parse_mode: "HTML" }
        );
        if (!data.next?.id) {
          const id = await loadOne(ctx.session.session);
          if (id) {
            data.next = { id };
            const { caption, reply_markup } = recommend({ pic, ctx, data });
            return ctx.editMessageCaption(caption, {
              reply_markup,
              parse_mode: "HTML",
            });
          }
        }
      })
    )
  );
};
