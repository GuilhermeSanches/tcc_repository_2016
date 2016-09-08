var admin = {

    rollback: function (connection) {

        return connection.rollback(function () {
            return next(err);
        });
    },

    commit: function (connection) {

        connection.commit(function (err) {
            if (err) {
                return this.rollback(connection);
            }
        });
    },

    getPermission: function (req, res, next, callback) {

        req.getConnection(function (err, connection) {
            if (err) {
                return next(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return next(err);
                    }
                    connection.query("SELECT * FROM " + req.query._feature + " WHERE ID =  ?", [req.params.id_user], function (err, result) {
                        callback(err, result, connection);
                    });
                });
            }
        });
    },

    getAll: function (req, res, next, callback) {

        req.getConnection(function (err, connection) {
            if (connection === undefined) {
                return next(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return next(err);
                    }
                    connection.query('SELECT * FROM ' + req.query._feature, function (err, result) {
                        callback(err, result, connection);
                    });
                });
            }
        });
    },

    post: function (req, res, next, callback) {

        req.getConnection(function (err, connection) {
            if (err) {
                return next(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return next(err);
                    }
                    connection.query("INSERT INTO " + req.query._feature + " SET ?", [req.body], function (err, result) {
                        callback(err, result, connection);
                    });
                });
            }
        });
    }
};

module.exports = admin;