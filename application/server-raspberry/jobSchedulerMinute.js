var request = require('../node_modules/request');
var mongodb = require('../node_modules/mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/raspberry';
var token = '';

var login = function () {
    request.post({
        uri: 'http://api-energymonitor.rhcloud.com/api/v1/login',
        form: { username: 'admin', pass: 'admin' },
        method: 'POST'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            token = JSON.parse(response.body).result.token;
            process.env['TOKEN'] = JSON.parse(response.body).result.token;
            job();
        }
    });
};

var job = function () {
    MongoClient.connect(url, function (err, db) {
        var count = 0;
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('history');            
            setInterval(function () {
                count++;
                collection.find().toArray(function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        require('dns').resolve('www.google.com', function (err) {
                            if (err) {
                                console.log("No connection");
                            } else {
                                var consumption = 0.000;
                                results.forEach(function (element) {
                                    consumption += parseFloat(element.data);
                                }, this);
                                request.put({
                                    headers: {
                                        'Authorization': process.env.TOKEN
                                    },
                                    uri: 'http://api-energymonitor.rhcloud.com/api/v1/clients/1/consumption',
                                    form: { last_consumption: consumption, date: new Date() },
                                    method: 'POST'
                                }, function (error, response, body) {
                                    if (error) {
                                        console.log("erro: " + error);
                                        if (count == 3) { process.exit(); }
                                    }
                                    if (response.statusCode == 401) {
                                        login();
                                    }
                                    if (!error && response.statusCode == 200) {
                                        console.log("salvou");
                                        if (count == 3) { process.exit(); }
                                    } else {
                                        if (count == 3) { process.exit(); }
                                    }
                                });
                            }
                        });
                    }
                });
            }, 20000);

        }
    });
};
login();
