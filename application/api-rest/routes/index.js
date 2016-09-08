var express         = require('express'),
    app             = express.Router(),
    Controller      = getmodule('controller'),
    Auth            = getmodule('security/auth');


/**
    *Area de login da pagina web ou mobile [POST -> login]
*/


app.route('/user/signin')
/*?_requestType=login&_feature=users

-> manda senha e email e retorna nivel de acesso, token e id_device caso seja um usuario comum
json de entrada{
    email: teste@teste.com,
    pass: 12345678,    
}
json de resposta{
  "token": "0ad2aa5466186edc18ce07172649ab2f", token renovado a cada dia e sem expiração
  "device": "125478", se for administrador esse campo retorna 'admin'
  "access_level": 1,   -> 0 para administrador, 1 -> usuario comum, 2 para raspberry
  "id_user": 1
}

*/
    .post(Controller.getController.checkModel)
        
/**
    *Area do cliete [POST -> autenticação]
*/

app.route('/user/:id_user/signin/authenticate')
    .post(Auth.authorizationRequest, Controller.getController.checkModel);

/**
    *Area Administrativa [POST -> cadastro de novos usuarios],
                         [GET  -> lista todos os usuários]
*/

app.route('/admin/:id_user/users')
/*?_requestType=getAll&_feature=users

-> IMPORTANTE: retorna todos os usuarios cadastrados. Somente admin pode usar esta rota
json de entrada{
    vazio
} porem existe o token Athorization no cabeçalho da requisição, sem ele retorna 403, acesos negado

json de saida[
        {
      "id": 1,
      "device_id": "",
      "firstname": "guilherme", 
      "lastname": "sanches",
      "email": "gui@gui.com.br",
      "pass": "teste",
      "access_level": 1
    }
]
*/
    .get    (Auth.authorizationRequest, Auth.getPermissionRequest, Controller.getController.checkModel)

/*?_requestType=post&_feature=users
    json de entrada{
    firstname: guilherme,
    lastname: sanches,
    email: gui@sanches.com,
    password: qwer1234,
    access_level: 1,
    device_id: se112121
    }
    IMPORTANTE, somente admin pode cadastrar novos usuarios
    json de saida{
          "result": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 11,
    "serverStatus": 3,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
  }
    }
*/
    .post   (Auth.authorizationRequest, Auth.getPermissionRequest, Controller.getController.checkModel)

    .put    (Auth.authorizationRequest, Controller.getController.checkModel)
    .delete (Auth.authorizationRequest, Controller.getController.checkModel);

module.exports = app;
