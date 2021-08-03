const { apiDecorator, getSession } = require("../tools");

const { shortGroupInfo, search } = require("../../api");

const { responseScheme, headersTokenScheme } = require("../schemas")

module.exports = async (fastify, options, done) => {
  fastify.get(
    "/shortGroupInfo",
    {
      schema: {
        query: {
          type: 'object',
          properties: {
            ids: { type: 'string' }
          }
        },
        headers: headersTokenScheme,
        response: responseScheme({ type: 'array' })
      }
    },
    apiDecorator(
      async ({ query, session }) =>
        query.ids && {
          ok: true,
          data: await shortGroupInfo({
            ids: query.ids.split(","),
            session,
          }),
        },
      getSession
    )
  );

  fastify.get(
    "/search",
    {
      schema: {
        query: {
          type: 'object',
          properties: {
            word: { type: 'string' },
            order: { type: 'string' },
            mode: { type: 'string' },
            page: { type: 'integer', default: 1 },
            s_mode: { type: 'string' },
            type: { type: 'string' }
          }
        },
        response: responseScheme({
          type: 'object',
          properties: {
            ids: {
              type: 'array',
              items: { type: 'integer' }
            }
          }
        })
      }
    },
    async ({ query }) => ({
      ok: true,
      data: await search(query)
    })
  );

  done();
};
