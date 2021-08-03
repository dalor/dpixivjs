exports.responseScheme = (data) => ({
    200: {
        type: 'object',
        properties: {
            ok: { type: 'boolean' },
            data: data || {}
        }
    }
})

exports.headersTokenScheme = {
    type: 'object',
    properties: {
        Token: { type: 'string' }
    }
}

exports.idsScheme = {
    type: 'object',
    properties: {
        ids: {
            type: 'array',
            items: { type: 'integer' }
        }
    }
}