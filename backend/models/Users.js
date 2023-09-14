//import sequelize
const Sequelize = require('sequelize');
//Conection with database
const db = require("./db");

//Criação da tabela Usuarios no banco de dados
const Register = db.define('Registers', {
    //Coluna campo ID
    id: {
        type: Sequelize.INTEGER, //Int number
        autoIncrement: true, // Id increment 
        allowNull: false, // Can't be null
        primaryKey: true // Primary Key
    },
    //Coluna campo NAME
    name: {
        type: Sequelize.STRING, //String
        allowNull: false, //Can't be null
    },
    //Coluna campo EMAIL
    email: {
        type: Sequelize.STRING, //string
        allowNull: false, //Can't be null
        unique: true
    },
    //Coluna campo PERMISSÃO
    //Tipos de usuarios que podem ser acessar o sistema
    // Administrador, Gerente, Juridico, Recursos Humanos, IPML
    permissions: {
        type: Sequelize.ENUM,
        values: ["ADMINISTRADOR", "SUPERVISOR", "USUARIO COMUM"],
        allowNull: false,
    },
    //Coluna campo Senha
    //A senha fica criptografada no DB
    password: {
        type: Sequelize.STRING, //string
        allowNull: false, //Can't be null
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
});

// Register.sync();
//export
module.exports = Register;