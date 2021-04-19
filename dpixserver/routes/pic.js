const { apiDecorator, getSession, pipeFixedUrlToReply } = require("../tools");

const { info, similar, recommender } = require("../../api");

const { DEFAULT_PREVIEW_PIC_URL } = require("../../config");

module.exports = async (fastify, options, done) => {
  fastify.get(
    "/:id/info",
    apiDecorator(async ({ params }) => ({
      ok: true,
      data: await info({
        id: params.id,
      }),
    }))
  );

  fastify.get(
    "/:id/similar",
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
    apiDecorator(
      async ({ params, session }) => ({
        ok: true,
        data: await recommender({
          count: 300,
          sample_illusts: [request.params.id],
          session,
        }),
      }),
      getSession
    )
  );

  fastify.get("/:id/preview", async ({ params }, reply) => {
    try {
      await info({
        id: params.id,
      }).then(
        ({ urls }) => urls?.regular && pipeFixedUrlToReply(urls.regular, reply)
      );
    } catch {
      pipeFixedUrlToReply(DEFAULT_PREVIEW_PIC_URL, reply);
    }
  });

  done();
};
