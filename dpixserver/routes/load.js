const { parseData } = require('../../dpixivbot/utils/data')

module.exports = async (fastify, options) => {

    fastify.get("/load", async (request, reply) => {
        if (request.query?.data) {
            const data = parseData(request.query.data)
            if (data.id)
                return reply.redirect('/' + data.id)
        }
        return { ok: false }
    });
};
