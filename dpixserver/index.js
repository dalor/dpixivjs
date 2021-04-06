module.exports = async (fastify, options) => {

  fastify.register(require("fastify-cors"), {
    origin: "*",
    credentials: true
  });

  fastify.register(require("./api"));
  fastify.register(require("./load"))
  fastify.register(require("./auth"))
  fastify.register(require("./react"));

}

