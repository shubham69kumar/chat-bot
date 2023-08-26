const { Sequelize} = require('sequelize') ; 
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./development.sqlite',
});

module.exports = sequelize;