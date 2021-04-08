const { pipeFixedUrl } = require('../../api')

module.exports = async (fastify, options) => {

    fastify.get("/fix", async (request, reply) => {
        try {
            if (request.query?.url) {
                pipeFixedUrl(request.query.url, reply.raw);
                reply.sent = true;
            } else {
                return { ok: false }
            }
        } catch {
            return { ok: false }
        }
    });

}