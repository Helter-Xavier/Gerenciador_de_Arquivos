//User Authentication
//Import npm JWT 
const jwt = require('jsonwebtoken');
const {
    promisify
} = require('util');

//Export JWT
module.exports = {
    eAdmin: function (req, res, next) {
        //Autorização de acesso do usuário
        const authHeaders = req.headers.authorization;
        //Se for diferente da autorização de acessso: ERRO 400, e retorna a menssagem de erro
        if (!authHeaders) {
            return res.status(400).json({
                erro: true,
                message: "Erro: Necessario realizar o login para acessar a página!"
            });
        }

        //Validação de TOKEN

        const [bearer, token] = authHeaders.split(' ');
        // console.log("bearer: " + bearer + " Token: " + token)

        //Se o TOKEN for Inavalido/Não existir retorna: ERRO 400, e a menssagem de erro
        if (!token) {
            return res.status(400).json({
                erro: true,
                message: "Erro: Necessario realizar o login para acessar a página!"
            });
        }
        //Se o senha for valida, executa TRY para acessar o sistema e um CATCH caso de erro da senha incorreta
        //Quando usuário fizer login, é gerado um TOKEN de acesso
        try {
            const decode = promisify(jwt.verify)(token, "95d30169a59c418b52013315fc81bc99fdf0a7b03a116f346ab628496f349ed5");
            req.userId = decode.id;
            return next();
        } catch (error) {
            return res.status(400).json({
                erro: true,
                message: "Erro: Necessario realizar o login para acessar a página!"
            });
        }
    }
}