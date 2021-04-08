const { session } = require("telegraf");
const { auth } = require("../../api");
const imageGenerator = require("../../imageGenerator")

const fs = require('fs')

module.exports = async (fastify, options) => {

    const setSession = (reply, session) => reply.header('Set-Cookie', `pixivSession=${session}; Path=/`)

    const errorResponse = (data) => ({
        ok: false,
        errors: Object.values(data?.body?.validation_errors || {})
    })

    fastify.get("/loginPic/*", async (request, reply) => {
        const { data, session } = await auth(request.query)
        if (session) {
            setSession(reply, session)
            return reply.type('image/png').send(imageGenerator({ ok: true, session }))
        } else {
            reply.code(404)
            return errorResponse(data)
        }
    });

    fastify.post("/login", async (request, reply) => {
        const { data, session } = await auth(request.body)
        if (session) {
            setSession(reply, session)
            return { ok: true, session }
        }
        else {
            return errorResponse(data)
        }
    });

    fastify.get('/script.js', function (request, reply) {
        fs.readFile('pluginScript.js', (err, fileBuffer) => {
            reply.send(err || fileBuffer)
        })
    })
};
