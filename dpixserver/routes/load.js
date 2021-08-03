const { parseData } = require('../../dpixivbot/utils/data')

module.exports = async (fastify, options) => {

    fastify.get("/load", { schema: { hide: true } }, async (request, reply) => {
        if (request.query?.data) {
            const data = parseData(request.query.data)
            if (data.id)
                return reply.redirect('/' + data.id)
        }
        return { ok: false }
    });

    fastify.get("/undefined", { schema: { hide: true } }, async (request, reply) => {
        return { ok: false }
    });
};
