//import sequilize  
const Sequelize = require('sequelize');

//Conexão com Bando de Dados  ("nomebd", "usuario", "senha usuario")
const sequelize = new Sequelize("", "", "", {
    host: "localhost", //Execcting in localhost
    dialect: "mysql", //
    logging: false
});

//Mensagem de conexão realizada com banco de dados
sequelize.authenticate()
    .then(function () {
        console.log("Conexão com banco de dados!")
    }).catch(function (erro) {
        console.log("Erro na conexão com o banco de dados" + erro)
    })

//export
module.exports = sequelize;