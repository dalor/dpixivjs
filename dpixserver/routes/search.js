const { apiDecorator, getSession } = require("../tools");

const { search } = require("../../api");

const { responseScheme } = require("../schemas")

module.exports = async (fastify, options, done) => {
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
            page: { type: 'integer' },
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
    apiDecorator(
      async ({ query, session }) => ({
        ok: true,
        data: await search(query)
      }),
      getSession
    )
  );

  done();
};
