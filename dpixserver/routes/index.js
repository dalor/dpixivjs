module.exports = async (fastify, options) => {

    fastify.register(require('./fix'))

    fastify.register(require('./pic'))
    fastify.register(require('./pics'))
    fastify.register(require('./user'))

    fastify.register(require('./load'))
    fastify.register(require('./authForScript'))
    

    fastify.register(require('./react'))
}