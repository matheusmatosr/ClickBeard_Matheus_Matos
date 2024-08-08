module.exports = (sequelize, DataTypes) => {
  const Barber = sequelize.define('Barber', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    hireDate: DataTypes.DATE,
    specialties: DataTypes.ARRAY(DataTypes.STRING),
  });

  Barber.associate = models => {
    Barber.hasMany(models.Appointment, { foreignKey: 'barberId' });
  };

  return Barber;
};
