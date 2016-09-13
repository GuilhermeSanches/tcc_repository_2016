var createSchema = require('json-gate').createSchema;

var schema = createSchema({

    type: 'object',
    properties: {

        data: {
            type: 'array',
            properties: {
                _id: { type: 'string' },
                sensor: { type: 'string' },
                data: { type: 'float' }
            },
            required: true
        },

        time: {
            type: 'date',            
            required: true
        },
    },

    additionalProperties: false

});

exports.getModels = schema;