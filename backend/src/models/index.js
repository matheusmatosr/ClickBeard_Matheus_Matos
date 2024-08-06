const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Barber = require('./barber')(sequelize, Sequelize.DataTypes);
const Client = require('./client')(sequelize, Sequelize.DataTypes);
const Appointment = require('./appointment')(sequelize, Sequelize.DataTypes);
const Specialty = require('./specialty')(sequelize, Sequelize.DataTypes);

Barber.belongsToMany(Specialty, { through: 'BarberSpecialty' });
Specialty.belongsToMany(Barber, { through: 'BarberSpecialty' });

Barber.hasMany(Appointment);
Client.hasMany(Appointment);

Appointment.belongsTo(Barber);
Appointment.belongsTo(Client);

module.exports = { sequelize, Barber, Client, Appointment, Specialty };