var createSchema    = require('json-gate').createSchema;

var schema          = createSchema({

    type: 'object',
    properties: {


        email: {
            type: 'string',			
            required: true,
            format: 'email'
        },

        password: {
            type: 'string',
            required: true
        }
    },

    additionalProperties: false

});

exports.getModels = schema;