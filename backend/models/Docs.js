const Sequelize = require('sequelize');
//Conexão com o banco de dados
const db = require("./db");

//Criação da tabela docs no banco de dados
const Docs = db.define('docs', {
    //Coluna campo ID
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    //Coluna campo NAME 
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    //Coluna campo DOCUMENTTYPE
    //Tipos de documentos que podem ser armazanados
    documentType: {
        type: Sequelize.ENUM,
        values: ["prontuario", "documentA", "documentB", "documentC"],
        allowNull: false,
    },
    //Coluna campo DOCUMENTCODE
    documentCode: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    //Coluna campo CPF
    documentCpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    //Coluna campo RG
    documentRg: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    //Coluna campo data informada no documento
    documentDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    //Coluna campo arquivo PDF
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// Docs.sync();

module.exports = Docs;