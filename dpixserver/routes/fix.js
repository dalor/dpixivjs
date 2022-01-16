const { pipeFixedUrlToReply } = require("../tools");

module.exports = async (fastify, options) => {
  fastify.get(
    "/fix",
    {
      schema: {
        query: {
          type: "object",
          properties: {
            url: {
              type: "string",
            },
          },
        },
      },
    },
    async (request, reply) => {
      if (request.query?.url) {
        return pipeFixedUrlToReply(request.query.url, reply);
      } else {
        return { ok: false };
      }
    }
  );
};
