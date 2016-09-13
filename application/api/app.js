require('getmodule');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/routes');
var app = express();
var cors = require('cors');
var mysql = require('mysql');
var connection = getmodule('database/connection');
var Utils = getmodule('utils/util');

app.set('view cache', true);

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(connection.get());
app.use('/', index);

app.use(function (req, res, next) {
    req.app = app;
    next();
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: Utils.getErrorByCode(err.code) || 'Erro não catalogado, consulte suporte técnico',
            err: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: Utils.getErrorByCode(err.code) || 'Erro não catalogado, consulte suporte técnico'
    });
});

module.exports = app;
