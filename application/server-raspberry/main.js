var SerialPort = require("serialport");
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/raspberry';
var port = new SerialPort("/dev/ttyUSB0", {
    baudRate: 9600
});
var dataTemp;
var dataTot = 0.00;
var count = 0;

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        var collection = db.collection('history');

        port.on('data', function (data) {

            //check if exists 
            if (typeof data !== undefined) {

                dataTemp = data.toString();
                var array = dataTemp.split(',');
                var lenght = array.lenght;

                array.forEach(function (element, index) {
                    if (index != (lenght - 1)) {
                        var temp = element.split(":");
                        if (temp[0] == "0") {
                            //console.log(parseFloat(temp[1]));
                        }                        
                        collection.find({ "sensor": temp[0].toString() }).toArray(function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                collection.update({ "sensor": temp[0].toString() }, {
                                    $set: { "data": (parseFloat(result[0].data) + parseFloat(temp[1])) }, function(err, numUpdated) {
                                        if (err) {
                                            console.log(err);
                                        } else if (numUpdated) {
                                            console.log('atualizado');
                                        } else {
                                            console.log('No document found with defined "find" criteria!');
                                        }
                                    }
                                });
                            }
                        });
                    }
                }, this);

            }
        });
    }
});


