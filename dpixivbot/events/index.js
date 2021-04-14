module.exports = (botctx) => {
  require("./chooseLang")(botctx);

  require("./pic")(botctx);
  require("./auth")(botctx);
  require("./login")(botctx);
  require("./global")(botctx);
  require("./nav")(botctx);
  require("./controls")(botctx);
  require("./similar")(botctx);
  require("./settings")(botctx);
  require("./channel")(botctx);
  require("./recommend")(botctx);
  require("./recommends")(botctx);
  require("./following")(botctx);
};
