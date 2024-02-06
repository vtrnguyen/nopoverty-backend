const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('no_poverty', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connect to the database is succeed!');
    } catch (e) {
        console.log('Unable to connect to the data base');
    }
}

module.exports = connectDB;
