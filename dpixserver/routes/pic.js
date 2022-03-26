const { apiDecorator, getSession, pipeFixedUrlToReply, pipeUgoiraArchiveToGifReply } = require("../tools");

const { info, similar, recommender, ugoiraMeta } = require("../../api");

const { DEFAULT_PREVIEW_PIC_URL } = require("../../config");

const { responseScheme, headersTokenScheme, idsScheme } = require("../schemas")

module.exports = async (fastify, options, done) => {
  fastify.get(
    "/:id/info",
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            }
          }
        },
        response: responseScheme()
      }
    },
    apiDecorator(async ({ params }) => ({
      ok: true,
      data: await info({
        id: params.id,
      }),
    }))
  );

  fastify.get(
    "/:id/similar",
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            }
          }
        },
        headers: headersTokenScheme,
        response: responseScheme(idsScheme)
      }
    },
    apiDecorator(
      async ({ params, session }) => ({
        ok: true,
        data: await similar({
          id: params.id,
          session,
        }),
      }),
      getSession
    )
  );

  fastify.get(
    "/:id/recommendation",
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            }
          }
        },
        query: {
          type: 'object',
          properties: {
            count: {
              type: 'integer',
              default: 100
            }
          }
        },
        headers: headersTokenScheme,
        response: responseScheme(idsScheme)
      }
    },
    apiDecorator(
      async ({ params, session, query }) => ({
        ok: true,
        data: await recommender({
          count: query.count || 100,
          sample_illusts: [params.id],
          session,
        }),
      }),
      getSession
    )
  );

  fastify.get("/:id/preview", { schema: { hide: true } }, async ({ params }, reply) => {
    try {
      return await info({
        id: params.id,
      }).then(
        ({ urls }) => urls?.regular && pipeFixedUrlToReply(urls.regular, reply)
      );
    } catch {
      return pipeFixedUrlToReply(DEFAULT_PREVIEW_PIC_URL, reply);
    }
  });

  fastify.get("/:id/ugoira", { schema: { hide: true } }, async ({ params }, reply) => {
    try {
      await ugoiraMeta({
        id: params.id,
      }).then(
        ({ original, averageDelay }) => {
          return pipeUgoiraArchiveToGifReply(original, averageDelay, reply)
        }
      );
    } catch {
      return pipeFixedUrlToReply(DEFAULT_PREVIEW_PIC_URL, reply);
    }
  });

  done();
};
