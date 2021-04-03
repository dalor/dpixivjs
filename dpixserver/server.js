const siteUrl = "*";

module.exports = async (fastify, options) => {
  fastify.register(require("fastify-cors"), {
    origin: siteUrl,
    credentials: true
  });

  fastify.register(require("./api"));
};
