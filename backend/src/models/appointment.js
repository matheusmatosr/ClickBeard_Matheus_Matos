module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Barber, { foreignKey: 'barberId' });
    Appointment.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return Appointment;
};
