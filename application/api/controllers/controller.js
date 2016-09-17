var createSchema = require('json-gate').createSchema;
var Utils = getmodule('utils/util');
var Model;
var Service;
var controller = {

    checkModel: function (req, res, next, _feature) {

        try {
            Model = getmodule('schemas/' + _feature + '/' + req.method);
            if (Model) {
                Model.getModels.validate(req.body);
            }
            next();

        } catch (err) {
            var erro;
            if (err.code) {
                erro = Utils.getErrorByCode(err.code);
            } else if (err.error) {
                erro = Utils.getErrorByCode(err.error.code);
            } else {
                erro = err;
            }

            return res
                .status(400)
                .json({ mensagem: erro + "." });
        }
    },

    prepareFields: function (req, res, next, _feature) {
        switch (_feature) {
            case 'history':
                this.prepareHistoryToPost(req, res, next);
                break;
            default:
                break;
        }
    },

    prepareHistoryToPost: function (req, res, next) {
        var body = req.body;
        var newBody = [];
        var time = body.time;
        var user_id = req.params.id;
        var device = body.device;

        body.data.forEach(function (element) {

            element.date = new Date();
            element.consumption = element.data;
            element.Users_id = user_id;
            element.sensors_id = element.sensor;
            element.devices_id = device;
            delete element._id;
            delete element.data;
            delete element.sensor;
            newBody.push(element);
        }, this);

        req.body = newBody;
        console.log(req.body);
        next();
    },

};

exports.getController = controller;

