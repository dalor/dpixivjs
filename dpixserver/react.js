const path = require("path");

module.exports = async (fastify, options) => {
  fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "../dpixclient", "build"),
    wildcard: false,
  });

  fastify.get("/*", async (request, reply) => {
    return reply.sendFile("index.html");
  });
};
