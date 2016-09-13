var crypto = require('crypto');
exports.authorizationRequestAdmin = function (req, res, next) {

    var bearerToken;
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {

        var day = new Date().getDate(),
            month = new Date().getMonth(),
            year = new Date().getFullYear(),
            chave = day + "/" + month + "/" + year + process.env.WORDSECRET;

        chave = crypto.createHash('md5').update(chave).digest("hex");

        if (bearerHeader === chave) {
            req.token = chave;
            next();
        }
        else
            return res.status(401).json({ results: "Acesso Negado", chave: chave });

    } else {
        return res.send(401);
    }
};

exports.authorizationRequest = function (req, res, next) {

    var bearerToken;
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {

        var day = new Date().getDate(),
            month = new Date().getMonth(),
            year = new Date().getFullYear(),
            access = req.params.id,
            chave = day + "/" + month + "/" + year + process.env.WORDSECRET + access;

        chave = crypto.createHash('md5').update(chave).digest("hex");

        if (bearerHeader === chave) {
            req.token = chave;
            next();
        }
        else
            return res.status(401).json({ results: "Acesso Negado", chave: chave });

    } else {
        return res.send(401);
    }
};

