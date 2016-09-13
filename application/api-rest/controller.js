var createSchema = require('json-gate').createSchema;
var Utils = getmodule('util/utils');

var controllerGen = {


    prepareBody: function (req, res, next) {
        try {

            var body = req.body;
            body.data.forEach(function(element) {
                console.log("elemento: "+JSON.stringify(element));
                
            }, this);

        } catch (error) {

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

    /*
    @function to check model and execute service 
*/

    checkModel: function (req, res, next) {


        try {

            var _requestType = req.query._requestType;
            var _feature = req.query._feature;

            if (_requestType !== 'getAll') {

                var Model = getmodule('schemas/' + _feature + '/' + _requestType);

            }

            if (_requestType !== 'getAll' && _requestType !== 'post' && _requestType !== 'delet' && _requestType !== 'put') {

                var Service = getmodule('api/' + _feature + '/service' + _feature);

            } else {

                var Service = getmodule('service');

            }


            if (Model) {
                Model.getModels.validate(req.body);
            }

            Service.getServices.exec(req, res, next, _requestType);

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
    }
};

exports.getController = controllerGen;

