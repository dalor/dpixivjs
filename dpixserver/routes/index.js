module.exports = async (fastify, options) => {
  fastify.register(require("./fix"));

  fastify.register(require("./pic"), { prefix: "/pic" });
  fastify.register(require("./pics"), { prefix: "/pics" });
  fastify.register(require("./user"), { prefix: "/user" });

  fastify.register(require("./load"));
  fastify.register(require("./authForScript"));

  fastify.register(require("./react"));
};
