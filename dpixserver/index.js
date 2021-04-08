module.exports = async (fastify, options) => {

  fastify.register(require("fastify-cors"), {
    origin: "*",
    credentials: true
  });

  fastify.register(require("./routes"));

}

