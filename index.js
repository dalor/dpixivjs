const fastify = require("fastify")({
    logger: true
});

const bot = require('./dpixivbot')

fastify.post('/' + bot.token, async request => {
    await bot.handleUpdate(request.body)
    return { ok: true }
})
// fastify.register(telegrafPlugin, { bot, path: '/' + bot.token })

fastify.register(require("./dpixserver"));

fastify.listen(process.env.PORT || 8080, "0.0.0.0", (err) =>
    console.error(err)
);