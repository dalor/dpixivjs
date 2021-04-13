const { session } = require("telegraf");
const { following } = require("../../api");
const { auth } = require("../utils/auth");
const { sendPics } = require("../utils/send");

module.exports = ({ config, bot }) => {
  const sendFollowingPage = (ctx, session, page = 1) =>
    following({ session, page }).then(async ({ ids }) => {
      const sIds = ctx.session.previousId
        ? ids.filter((id) => id > ctx.session.previousId)
        : ids;
      if (sIds.length) {
        await sendPics(ctx, ids, ctx.session);
        return ids[0];
      }
    });

  bot.command(
    "following",
    auth(async (ctx, session) => {
      const previousId = await sendFollowingPage(ctx, session);
      if (previousId) {
        ctx.session.previousId = previousId;
      } else {
        return ctx.reply(ctx.t("no_new_following"));
      }
    })
  );
};
