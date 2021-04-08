const { apiDecorator, getSession } = require('../tools')

const {
    info,
    similar,
    recommender
} = require("../../api");

module.exports = async (fastify, options) => {


    fastify.get("/pic/:id/info", apiDecorator(async ({ params }) => ({
        ok: true,
        data: await info({
            id: params.id,
        })
    })))

    fastify.get("/pic/:id/similar", apiDecorator(async ({ params, session }) => ({
        ok: true,
        data: await similar({
            id: params.id,
            session,
        })
    }), getSession))

    fastify.get("/pic/:id/recommendation", apiDecorator(async ({ params, session }) => ({
        ok: true,
        data: await recommender({
            count: 300,
            sample_illusts: [request.params.id],
            session,
        })
    }), getSession))

}