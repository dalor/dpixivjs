const { apiDecorator, getSession } = require("../tools");

const { recommender, following, userData, userExtra } = require("../../api");

const { responseScheme, headersTokenScheme, idsScheme } = require("../schemas")

module.exports = async (fastify, options, done) => {
  fastify.get(
    "/info",
    {
      schema: {
        headers: headersTokenScheme,
        response: responseScheme()
      }
    },
    apiDecorator(
      async ({ session }) => ({
        ok: true,
        data: await userData({
          session,
        }),
      }),
      getSession
    )
  );

  fastify.get(
    "/extra",
    {
      schema: {
        headers: headersTokenScheme,
        response: responseScheme()
      }
    },
    apiDecorator(
      async ({ session }) => ({
        ok: true,
        data: await userExtra({
          session,
        }),
      }),
      getSession
    )
  );

  fastify.get(
    "/discovery",
    {
      schema: {
        headers: headersTokenScheme,
        response: responseScheme(idsScheme)
      }
    },
    apiDecorator(
      async ({ session }) => ({
        ok: true,
        data: await recommender({
          count: 1000,
          session,
        }),
      }),
      getSession
    )
  );

  fastify.get(
    "/following/:page",
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              default: 1
            }
          }
        },
        headers: headersTokenScheme,
        response: responseScheme(idsScheme)
      }
    },
    apiDecorator(
      async ({ session, params }) => ({
        ok: true,
        data: await following({
          page: params.page,
          session,
        }),
      }),
      getSession
    )
  );

  done();
};
