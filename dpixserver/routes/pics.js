const { apiDecorator, getSession } = require("../tools");

const { shortGroupInfo } = require("../../api");

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

  done();
};
