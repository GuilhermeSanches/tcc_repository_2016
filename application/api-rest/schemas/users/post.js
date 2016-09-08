var createSchema = require('json-gate').createSchema;

var schema = createSchema({

    type: 'object',
    properties: {

        firstname: {
            type: 'string',
            minLength: 1,
            maxLength: 64,
            required: true
        },

        lastname: {
            type: 'string',
            minLength: 1,
            maxLength: 64,
            required: true
        },

        email: {
            type: 'string',			
            required: true,
            format: 'email'
        },

        pass: {
            type: 'string',
            required: true
        },
        
        device: {
            type: 'string',
            required: true
        },
        
        access_level:{
            type: 'Number',
            required: true
        }

    },

    additionalProperties: false

});

exports.getModels = schema;