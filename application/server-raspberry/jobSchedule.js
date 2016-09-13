var request = require('../node_modules/request');
var mongodb = require('../node_modules/mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/raspberry';

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        var collection = db.collection('history');

        collection.find().toArray(function (err, results) {
            if (err) {
                console.log(err);
            } else {
                require('dns').resolve('www.google.com', function (err) {
                    if (err) {
                        console.log("No connection");
                    } else {
                        console.log("Connected");
                        request.post('http://192.168.1.3:3000/api/v1/clients/1/history', { form: { data: results, time: new Date() } }, function (error, response, body) {
                            if (error) {
                                console.log("erro: " + error);                                
                            }
                            if (!error && response.statusCode == 200) {
                                console.log("salvou");
                            }
                        });
                    }
                });
                console.log(results);
            }
        });
    }
});
