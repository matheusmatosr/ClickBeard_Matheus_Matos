module.exports = (sequelize, DataTypes) => {
  const Barber = sequelize.define('Barber', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    hireDate: DataTypes.DATE,
    specialties: DataTypes.JSON, // Alterado para JSON
  });

  Barber.associate = models => {
    Barber.hasMany(models.Appointment, { foreignKey: 'barberId' });
  };

  return Barber;
};
