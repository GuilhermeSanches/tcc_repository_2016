var crypto = require('crypto');
var service = getmodule('./service');
exports.authorizationRequest = function (req, res, next) {

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    
    if (typeof bearerHeader !== 'undefined') {      

        var day = new Date().getDate(),
            month = new Date().getMonth(),
            year = new Date().getFullYear(),
            access = req.params.id_user,                              
            chave = day+"/"+month+"/"+year+process.env.WORDSECRET+access;

        console.log(access);
        chave =  crypto.createHash('md5').update(chave).digest("hex");        

        if(bearerHeader === chave){
            req.token = chave;
            next();
        }
        else
            res.status(403).json({results: "Acesso Negado", chave: chave});  

    } else {
        res.send(403);
    }
};

exports.getPermissionRequest = function (req, res, next) {                     
    
 service.getServices.getPermission(req, res, next);    
    
};