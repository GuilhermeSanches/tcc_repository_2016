var Utils = getmodule('util/utils');

var serviceUsers = {


    exec: function (req, res, next, _resquestType) {


        
        serviceUsers[_resquestType](req, res, next);

    },
    checkLogin: function (req, res, next) {

        req.getConnection(function(err, connection) {

            if(connection === undefined ) {

                return next(err);

            } else {

                connection.beginTransaction(function(err) {

                    if (err) { 
                        return next(err);
                    }

                    connection.query('SELECT * FROM '+req.query._feature+' WHERE pass = ? and email =  ? and id = ?',[req.params.id_user, req.body.email, req.body.device_id], function(err,result) {

                        if (err) {                        
                            return connection.rollback(function() {
                                return next(err);
                            });
                        }

                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    return next(err);
                                });
                            }                                    
                        });
                        
                       


                        if(result.length > 0){

                            return res
                                .status(200)
                                .json({
                                acesso: "Acesso Permitido"                                
                            });

                        } else {

                            return res.status(401).json({results: "Acesso Negado!"});

                        }
                   
                    });
                }); 
            } 
        });


    },
    login: function(req, res, next) {

        var token;

        req.getConnection(function(err, connection) {

            if(connection === undefined ) {

                return next(err);

            } else {

                connection.beginTransaction(function(err) {

                    if (err) { 
                        return next(err);
                    }

                    connection.query('SELECT * FROM '+req.query._feature+' WHERE pass = ? and email =  ?',[req.body.password, req.body.email], function(err,result) {

                        if (err) {                        
                            return connection.rollback(function() {
                                return next(err);
                            });
                        }

                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    return next(err);
                                });
                            }                                    
                        });

                        if(result.length > 0){
                            token = Utils.getToken(result[0].id);
                        }else {
                            return res.status(401).json({erro: "Acesso Negado"});
                        }

                        return res
                            .status(200)
                            .json({
                            token: token,
                            device: result[0].device_id || 'admin',
                            access_level: result[0].access_level,
                            id_user: result[0].id
                        });
                    });
                }); 
            } 
        });
    }
};
exports.getServices = serviceUsers;