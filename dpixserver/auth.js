const { session } = require("telegraf");
const { auth } = require("../api");
const imageGenerator = require("../imageGenerator")

module.exports = async (fastify, options) => {

    fastify.get("/loginPic/*", async (request, reply) => {
        const data = await auth(request.query)
        if (data?.session) {
            reply.header('Set-Cookie', `pixivSession=${data.session}; Path=/`)
            return reply.type('image/png').send(imageGenerator(request.query))
        } else {
            reply.code(404)
            return data
        }
    });

    fastify.post("/login", async (request, reply) => {
        // reply.header("Access-Control-Allow-Origin", "*");
        // reply.header("Access-Control-Allow-Credentials", "true");
        // console.log(request.body)
        return await auth(request.body)
    });
};
