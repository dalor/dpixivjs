const { apiDecorator, getSession } = require("../tools");

const { recommender, following, userData, userExtra } = require("../../api");

module.exports = async (fastify, options, done) => {
  fastify.get(
    "/info",
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
