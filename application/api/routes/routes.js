var express = require('express'),
    app = express.Router(),
    Controller = getmodule('controllers/controller'),
    Service = getmodule('services/service'),
    Auth = getmodule('security/auth');

app.route('/api/v1/login')
    .post(function (req, res, next) {
        Controller.getController.checkModel(req, res, next, 'login');
    }, function (req, res, next) {
        Service.getService.exec(req, res, next, req.method, 'users');
    });

app.route('/api/v1/clients')
    .get()
    .post(Auth.authorizationRequestAdmin,
    function (req, res, next) {
        Controller.getController.checkModel(req, res, next, 'clients');
    }, function (req, res, next) {
        Service.getService.exec(req, res, next, req.method, 'clients');
    });

app.route('/api/v1/clients/:id')
    .get()
    .put();

app.route('/api/v1/clients/:id/consumption')
    .get(Auth.authorizationRequest,
    function (req, res, next) {
        Service.getService.exec(req, res, next, req.method, 'consumption');
    })
    .put(Auth.authorizationRequest,
    function (req, res, next) {
        Controller.getController.checkModel(req, res, next, 'consumption');
    },
    function (req, res, next) {
        Service.getService.exec(req, res, next, req.method, 'consumption');
    }
    );

app.route('/api/v1/clients/:id/history')
    .get(Auth.authorizationRequest,
    function (req, res, next) {
        Service.getService.exec(req, res, next, req.method, 'history');
    })
    .post(Auth.authorizationRequest,
    function (req, res, next) {
        Controller.getController.checkModel(req, res, next, 'history');
    }, function (req, res, next) {
        Controller.getController.prepareFields(req, res, next, 'history');
    }, function (req, res, next) {
        Service.getService.exec(req, res, next, req.method, 'history');
    });

module.exports = app;
