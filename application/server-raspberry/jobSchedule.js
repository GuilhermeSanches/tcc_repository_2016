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
                        request.post({
                            headers: {
                                'Authorization': 'a459d39cbf2f6ab43c054acf8902cda2'
                            },
                            uri: 'http://api-energymonitor.rhcloud.com/api/v1/clients/1/history',
                            form: { data: results, time: new Date(), device: "123456" },
                            method: 'POST'
                        }, function (error, response, body) {                            
                            if (error) {
                                console.log("erro: " + error);
                                process.exit();
                            }
                            if (!error && response.statusCode == 200) {
                                console.log("salvou");
                                process.exit();
                            } else {                                
                                process.exit();
                            }
                        });
                    }
                });
                console.log(results);
            }
        });
    }
});
