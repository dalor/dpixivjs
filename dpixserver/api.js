const {
  info,
  similar,
  shortGroupInfo,
  recommender,
  following,
  pipeFixedUrl,
} = require("../api");

const getSession = (request) => request.headers.token;

module.exports = async (fastify, options) => {

  fastify.get("/fix", async (request, reply) => {
    if (!request.query.url) return { ok: false };
    try {
      pipeFixedUrl(request.query.url, reply.raw);
      reply.sent = true;
    } catch (error) {
      return {
        ok: false,
      };
    }
  });

  fastify.get("/info/:id", async (request) => {
    try {
      return {
        ok: true,
        data: await info({
          id: request.params.id,
        }),
      };
    } catch (error) {
      return {
        ok: false,
      };
    }
  });

  fastify.get("/similar/:id", async (request) => {
    const session = getSession(request);
    if (!session) return { ok: false };
    try {
      return {
        ok: true,
        data: await similar({
          id: request.params.id,
          session,
        }),
      };
    } catch (error) {
      return {
        ok: false,
      };
    }
  });

  fastify.get("/shortGroupInfo", async (request) => {
    const session = getSession(request);
    if (!session) return { ok: false };
    try {
      if (request.query.ids)
        return {
          ok: true,
          data: await shortGroupInfo({
            ids: request.query.ids.split(","),
            session,
          }),
        };
      else
        return {
          ok: false,
        };
    } catch (error) {
      return {
        ok: false,
      };
    }
  });

  fastify.get("/discovery", async (request) => {
    const session = getSession(request);
    if (!session) return { ok: false };
    try {
      return {
        ok: true,
        data: await recommender({
          count: 1000,
          session,
        }),
      };
    } catch (error) {
      return {
        ok: false,
      };
    }
  });

  fastify.get("/recommendation/:id", async (request) => {
    const session = getSession(request);
    if (!session) return { ok: false };
    try {
      return {
        ok: true,
        data: await recommender({
          count: 300,
          sample_illusts: [request.params.id],
          session,
        }),
      };
    } catch (error) {
      return {
        ok: false,
      };
    }
  });

  fastify.get("/following/:page", async (request) => {
    const session = getSession(request);
    console.log(session)
    if (!session) return { ok: false };
    try {
      return {
        ok: true,
        data: await following({
          page: request.params.page,
          session,
        }),
      };
    } catch (error) {
      return {
        ok: false,
      };
    }
  });
};
