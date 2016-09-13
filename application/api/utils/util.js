var crypto = require('crypto');
var ERROR = getmodule('utils/errorCodes/codeErr');


var functionsUtils = {

    getErrorByCode: function (code) {

        return ERROR.ERROR[code];

    },

    getToken: function (idUser) {

        var token;

        var day = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();

        var chave = day + "/" + month + "/" + year + process.env.WORDSECRET + idUser;

        chave = crypto.createHash('md5').update(chave).digest("hex");

        return chave;
    },
};



module.exports = functionsUtils;