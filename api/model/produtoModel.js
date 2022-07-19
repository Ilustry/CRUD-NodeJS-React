import { Sequelize } from 'sequelize'
import database from '../config/database.js'

export default database.define("produto", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idFuncionario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    dataValidade: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
})