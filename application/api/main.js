//#!/usr/bin/env node
var express = require('express');
var fs = require('fs');
var app = require('./app');
var App = function () {
    var self = this;

    this.setupVariables = function () {
        self.ipaddress = process.env.ADDRESS || '127.0.0.1';
        self.port = process.env.OPENSHIFT_NODEJS_PORT || process.env.NODEJS_PORT || 3000;
    };

    this.initializeServer = function () {
        self.app = express();
    };

    this.initialize = function () {
        self.setupVariables();
        self.initializeServer();
        self.start();
    };

    this.start = function () {
        var server = app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), self.ipaddress, self.port);
        });
    };
};

var appStarted = new App();
appStarted.initialize();



