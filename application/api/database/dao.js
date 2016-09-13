var Utils = getmodule('utils/util');
var admin = {

    rollback: function (connection, res, erro) {
        connection.rollback(function (err) {
            return res.status(404).json({ "Error": "Erro desconhecido, consulte suporte técnico", "erro": erro });
        });
    },

    commit: function (connection, res, result) {

        connection.commit(function (err) {
            if (err) {
                return this.rollback(connection);
            }
            return res
                .status(200)
                .json({
                    result: result
                });
        });
    },

    LOGIN: function (req, res, next, _feature, callback) {

        var token;

        req.getConnection(function (err, connection) {

            if (connection === undefined) {
                return next(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return next(err);
                    }
                    connection.query('SELECT * FROM ' + _feature + ' WHERE pass = ? and username =  ?',
                        [req.body.pass, req.body.username],
                        function (err, result) {
                            if (result.length > 0) {
                                token = Utils.getToken(result[0].id);
                                var results = {
                                    id_user: result[0].id,
                                    name: result[0].name,
                                    device: result[0].device || 'admin',
                                    access_level: result[0].access_level,
                                    email: result[0].email,
                                    token: token
                                };
                                callback(err, results, connection);
                            } else {
                                return res.status(401).json({ erro: "Acesso Negado" });
                            }
                        });
                });
            }
        });
    },

    POST: function (req, res, next, _feature, callback) {

        req.getConnection(function (err, connection) {
            if (err) {
                return next(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return next(err);
                    }
                    connection.query("INSERT INTO " + _feature + " SET ?",
                        [req.body],
                        function (err, result) {
                            callback(err, result, connection);
                        });
                });
            }
        });
    },

    POST_HISTORY: function (req, res, next, _feature, callback) {
        var values = [];
        req.body.forEach(function (element) {
            var temp = [];
            temp.push(element.devices_id);
            temp.push(element.sensors_id);
            temp.push(element.Users_id);
            temp.push(element.date);
            temp.push(element.consumption);
            values.push(temp);
        }, this);

        req.getConnection(function (err, connection) {
            if (err) {
                return next(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return next(err);
                    }
                    connection.query("INSERT INTO " + _feature + "(devices_id, sensors_id, Users_id, date, consumption) VALUES ?",
                        [values],
                        function (err, result) {
                            callback(err, result, connection);
                        });
                });
            }
        });
    },

    GET: function (req, res, next, _feature, callback) {
        req.getConnection(function (err, connection) {
            if (connection === undefined) {
                return next(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return next(err);
                    }
                    connection.query('SELECT * FROM ' + _feature + ' WHERE Users_id = ?', req.params.id, function (err, result) {
                        callback(err, result, connection);
                    });
                });
            }
        });
    },
};



module.exports = admin;