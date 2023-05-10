import { Sequelize } from "sequelize";

const database = new Sequelize('test', 'root', '', {
    host: '192.168.50.231',
    dialect: 'mysql',
})

export default database;