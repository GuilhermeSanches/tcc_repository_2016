var crypto  = require('crypto');
var ERROR   = getmodule('util/errors_codes/codesErr');


var functionsUtils = {

    getErrorByCode: function (code) {

        return ERROR.ERROR[code];

    },

    getToken: function (idDevice) {

        var token;

        var day = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();

        var chave = day+"/"+month+"/"+year+"xurupitas"+idDevice;

        chave =  crypto.createHash('md5').update(chave).digest("hex");   
        
        return chave;
    },
    
    stringConnectionFormat: function (SQL_CONNECTION) {
        
        var fields_connection = SQL_CONNECTION.split(",");
        
        var connection = {
            host: fields_connection[0],
            user: fields_connection[1],
            password: fields_connection[2],
            database: fields_connection[3]
        };
       
        return connection;
    }


};

module.exports = functionsUtils;