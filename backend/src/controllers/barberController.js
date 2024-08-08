const { Barber } = require('../models');

exports.createBarber = async (req, res) => {
  try {
    const { name, age, hireDate, specialties } = req.body;
    // Verifique se specialties é um array
    const barber = await Barber.create({
      name,
      age,
      hireDate,
      specialties: Array.isArray(specialties) ? specialties : [], // Garante que é um array
    });
    res.status(201).json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating barber' });
  }
};

exports.getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.findAll();
    res.status(200).json(barbers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching barbers' });
  }
};