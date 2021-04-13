const { userExtra } = require("../../api");

exports.auth = (callback) => (ctx) => {
  const session = ctx?.session?.session;
  if (session) {
    return Promise.all([
      userExtra({ session }).catch(() => {
        ctx.session.session = null;
        return ctx.reply(ctx.t("wrong_session"));
      }),
      callback(ctx, session),
    ]);
  } else {
    return ctx.reply(ctx.t("please_auth"));
  }
};
