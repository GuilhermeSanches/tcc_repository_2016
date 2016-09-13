var connection = require('express-myconnection');
var mysql = require('mysql');
//var Utils = getmodule('util/utils');

var Connection = {

    get: function () {

        return connection(mysql,
            {
                host: '127.0.0.1',
                user: 'root',
                password: 'root',
                port: 3306,
                database: 'db_server',
            },
            'request'
        );
    }
};

module.exports = Connection;