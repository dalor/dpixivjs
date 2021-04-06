const { parseData } = require('../dpixivbot/utils/data')

module.exports = async (fastify, options) => {

    fastify.get("/load", async (request, reply) => {
        if (request.query?.data) {
            const data = parseData(request.query.data)
            return reply.redirect('/' + data.id)
        } else {
            return { ok: false }
        }
    });
};
