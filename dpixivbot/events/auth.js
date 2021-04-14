const { Extra } = require("telegraf");
const { userData } = require("../../api");

module.exports = ({ bot }) => {
  const proceedSession = async (ctx) => {
    const session = ctx.match.groups.session;
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
  };

  bot.hears(/.+\/session\/(?<session>[^\/\?\&]+)/, proceedSession);

  bot.hears(/\/start session_(?<session>.+)/, proceedSession);
};
