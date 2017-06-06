/**
 * Created by zwl on 2017/4/21.
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('chuangxin', 'root', 'z295415658', {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000
    // },
    //
    // storage: 'path/to/database.sqlite'
});


module.exports = sequelize;
