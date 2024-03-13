const { Sequelize } = require('sequelize');
const { CONNECTION_STRING } = require('../.env');

const sequelize = new Sequelize(CONNECTION_STRING);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        sequelize.close(); // Close the connection
    }
}

testConnection();