var createSchema = require('json-gate').createSchema;
var schema = createSchema({

    type: 'object',
    properties: {
        username: {
            type: 'string',
            required: true
        },

        pass: {
            type: 'string',
            required: true
        }
    },
    additionalProperties: false
});

exports.getModels = schema;