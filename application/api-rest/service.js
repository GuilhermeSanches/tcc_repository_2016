var dao = getmodule('database_access/genericDao');

var serviceGen = {

    exec: function (req, res, next, _resquestType){


        serviceGen[_resquestType](req, res, next);

    },    

    getAll: function(req, res, next) {

        dao.getAll(req, res, next, function(err, result, connection) {

            if (err) {                        
                dao.rollback(connection);
            }

            dao.commit(connection);

            return res
                .status(200)
                .json({
                result: result
            });
        });

    },

    post: function(req, res, next) {

        dao.post(req, res, next, function(err, result, connection) {

            if (err) {                        
                dao.rollback(connection);
            }

            dao.commit(connection);

            return res
                .status(200)
                .json({
                result: result
            });
        });
    },

    getPermission: function (req, res, next) {

        var usuario = undefined;

        dao.getPermission(req, res, next, function(err, result, connection) {

            if (err) {                        
                dao.rollback(connection);
            }

            dao.commit(connection);

            if(result.length == 0){
                res.status(403).json({mensagem: "Usuário não cadastrado"});
            } else{
                usuario =  result[0];
                if(usuario.access_level == 0) {
                    next();
                } else{
                    res.status(403).json({mensagem: "Acesso negado para este nível de usuário!"});    
                }
            }
        });
    }

};

exports.getServices = serviceGen;