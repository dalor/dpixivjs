const { apiDecorator, getSession } = require('../tools')

const {
    recommender,
    following
} = require("../../api");

module.exports = async (fastify, options) => {


    fastify.get("/user/discovery", apiDecorator(async ({ session }) =>
    ({
        ok: true,
        data: await recommender({
            count: 1000,
            session,
        })
    }), getSession))

    fastify.get("/user/following/:page", apiDecorator(async ({ session, params }) =>
    ({
        ok: true,
        data: await following({
            page: params.page,
            session,
        })
    }), getSession))

}