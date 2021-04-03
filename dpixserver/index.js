module.exports = async (fastify, options) => {

  fastify.register(require("./load"))
  fastify.register(require("./server"));
  fastify.register(require("./react"));

}

