const { pipeFixedUrlToReply, pipeUgoiraArchiveToGifReply, pipeUgoiraArchiveToMP4 } = require("../tools");

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

  fastify.get(
    "/fixUgoira",
    {
      schema: {
        query: {
          type: "object",
          properties: {
            url: {
              type: "string",
            },
            delay: {
              type: "integer",
            },
            type: {
              type: "string",
            },
          },
        },
      },
    },
    async (request, reply) => {
      if (request.query?.url) {
        if (request.query.type === "mp4") {
          return pipeUgoiraArchiveToMP4(request.query.url, request.query.delay, reply);
        } else {
          return pipeUgoiraArchiveToGifReply(request.query.url, request.query.delay, reply);
        }
      } else {
        return { ok: false };
      }
    }
  );
};
