var dao = getmodule('database/dao');
var service = {

    exec: function (req, res, next, _resquestType, _feature) {
        this[_resquestType](req, res, next, _feature);
    },

    POST: function (req, res, next, _feature) {
        switch (_feature) {
            case 'history':
                dao.POST_HISTORY(req, res, next, _feature, function (err, result, connection) {
                    if (err) {
                        dao.rollback(connection);
                    } else {
                        dao.commit(connection, res, result);
                    }
                });
                break;
            case 'users':
                dao.LOGIN(req, res, next, _feature, function (err, result, connection) {
                    if (err) {
                        dao.rollback(connection);
                    } else {
                        dao.commit(connection, res, result);
                    }
                });
                break;
            default:
                dao.POST(req, res, next, _feature, function (err, result, connection) {
                    if (err) {
                        dao.rollback(connection, res, err);
                    } else {
                        dao.commit(connection, res, result);
                    }
                });
                break;
        }
    },
    GET: function (req, res, next, _feature) {
        switch (_feature) {
            case 'history':
                dao.GET(req, res, next, _feature, function (err, result, connection) {
                    if (err) {
                        dao.rollback(connection);
                    }
                    dao.commit(connection, res, result);
                });
                break;
            case 'consumption':
                dao.GET_CONSUMPTION(req, res, next, _feature, function (err, result, connection) {
                    if (err) {
                        dao.rollback(connection);
                    }
                    dao.commit(connection, res, result);
                });
                break;
            default:
                break;
        }
    },
    PUT: function (req, res, next, _feature) {
        switch (_feature) {
            case 'consumption':
                dao.PUT(req, res, next, _feature, function (err, result, connection) {
                    if (err) {
                        dao.rollback(connection);
                    }
                    dao.commit(connection, res, result);
                });
                break;
            default:
                break;
        }
    }
};

exports.getService = service;