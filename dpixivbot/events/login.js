const { Extra } = require("telegraf");

module.exports = ({ bot, config }) => {
  bot.command("login", (ctx) =>
    ctx.reply(
      ctx.t("login_menu"),
      Extra.markup((m) =>
        m.inlineKeyboard([
          [m.urlButton(ctx.t("login_help"), config.SITE_URL + "/help")],
          [
            m.urlButton(
              ctx.t("connect_site"),
              config.SITE_URL + `/session/${ctx.session.session}`,
              !ctx.session.session
            ),
          ],
        ])
      )
    )
  );

  bot.command("token", (ctx) =>
    ctx.reply(`<code>${ctx.session.session}</code>`, { parse_mode: 'HTML' })
  );
};
