var createSchema = require('json-gate').createSchema;

var schema = createSchema({

    type: 'object',
    properties: {

        last_consumption: {
            type: 'float',
            required: true
        },

        date: {
            type: 'date',
            required: true
        }
    },

    additionalProperties: false

});

exports.getModels = schema;