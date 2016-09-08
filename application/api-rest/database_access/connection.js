var connection = require('express-myconnection');
var mysql = require('mysql');
var Utils = getmodule('util/utils');

var Connection = {

    get: function () {

        return connection(mysql,
            {
                host: 'localhost',
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