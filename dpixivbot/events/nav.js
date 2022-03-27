const { loadData } = require("../utils/data");
const { ugoiraMeta } = require("../../api");
const { UGOIRA_LOAD_URL } = require("../../config");
const update = require("../utils/update");
const { originalToRegular } = require("../utils/fixes");

module.exports = ({ bot }) => {
  const showPage = (ctx, data) =>
    ctx.answerCbQuery(`[${data.page + 1}/${data.pageCount}]`);

  bot.action(
    "prev",
    loadData((ctx, data) => {
      data.page = data.page - 1 < 0 ? data.pageCount - 1 : data.page - 1;
      return update(ctx, data, { changeMedia: true }).then(showPage(ctx, data));
    })
  );

  bot.action(
    "next",
    loadData((ctx, data) => {
      data.page = data.page + 1 >= data.pageCount ? 0 : data.page + 1;
      return update(ctx, data, { changeMedia: true }).then(showPage(ctx, data));
    })
  );

  bot.action(
    "ugoira",
    loadData((ctx, data) => {
      return ugoiraMeta({
        id: data.id,
        session: ctx.session.session || config.DEFAULT_SESSION
      }).then(({ averageDelay, original }) => {
        return update(ctx, Object.assign(data, {
          ugoiraActive: true
        }), {
          changeMedia: true,
          ugoira: `${UGOIRA_LOAD_URL}?url=${original}&delay=${averageDelay}&type=mp4`
        });
      })
    })
  );

  bot.action(
    "preload",
    loadData((ctx, data) => {
      if (data.pageCount > 1) {
        const picsToPreload = new Array(data.pageCount)
          .fill()
          .map((_, i) => originalToRegular(data.url, i))
          .filter((_, i) => i != data.page);
        data.preload = true;
        return Promise.all(
          picsToPreload.map((url) =>
            ctx
              .editMessageMedia({
                type: "photo",
                media: url,
                parse_mode: "HTML",
              })
              .catch(() => { })
          )
        ).finally(() =>
          setTimeout(() => update(ctx, data, { changeMedia: true }), 500)
        );
      }
    })
  );
};
