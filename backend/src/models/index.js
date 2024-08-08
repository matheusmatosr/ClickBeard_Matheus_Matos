const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Barber = require('./barber')(sequelize, Sequelize.DataTypes);
const Client = require('./client')(sequelize, Sequelize.DataTypes);
const Appointment = require('./appointment')(sequelize, Sequelize.DataTypes);

Barber.hasMany(Appointment, { foreignKey: 'barberId' });
Client.hasMany(Appointment, { foreignKey: 'clientId' });

Appointment.belongsTo(Barber, { foreignKey: 'barberId' });
Appointment.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = { sequelize, Barber, Client, Appointment };
