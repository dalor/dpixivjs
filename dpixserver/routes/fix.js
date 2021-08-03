const { pipeFixedUrlToReply } = require("../tools");

module.exports = async (fastify, options) => {
  fastify.get("/fix", { schema: { hide: true } }, async (request, reply) => {
    if (request.query?.url) {
      pipeFixedUrlToReply(request.query.url, reply);
    } else {
      return { ok: false };
    }
  });
};
