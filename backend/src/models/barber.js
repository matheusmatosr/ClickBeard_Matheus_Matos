module.exports = (sequelize, DataTypes) => {
  const Barber = sequelize.define('Barber', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    specialties: {
      type: DataTypes.JSON,
      allowNull: true,
    }, 
  });

  return Barber;
};
