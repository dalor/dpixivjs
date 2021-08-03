module.exports = async (fastify, options) => {

  fastify.register(require('fastify-swagger'), {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'DPIXIV API'
      }
    },
    exposeRoute: true,
    uiConfig: {
      deepLinking: false
    },
  })

  fastify.register(require("fastify-cors"), {
    origin: "*",
    credentials: true
  });

  fastify.register(require("./routes"));

}

