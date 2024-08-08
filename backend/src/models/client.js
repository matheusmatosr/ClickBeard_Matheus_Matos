module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });

  Client.associate = models => {
    Client.hasMany(models.Appointment, { foreignKey: 'clientId' });
  };

  return Client;
};
