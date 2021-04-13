const { Extra } = require("telegraf");
const { userData } = require("../../api");

module.exports = ({ bot }) => {
  bot.hears(/\/start session_(.+)/, async (ctx) => {
    const session = ctx.match[1];
    return userData({ session })
      .then((user) => {
        const { name, profileImg } = user;
        ctx.session.session = session;
        return ctx.reply(
          ctx.t("auth_greeting", { name, profileImg }),
          Extra.HTML()
        );
      })
      .catch((e) => console.log(e) || ctx.reply(ctx.t("wrong_session")));
  });
};
