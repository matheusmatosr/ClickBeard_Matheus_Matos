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

exports.updateBarber = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, hireDate, specialties } = req.body;

    const barber = await Barber.findByPk(id);
    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' });
    }

    barber.name = name || barber.name;
    barber.age = age || barber.age;
    barber.hireDate = hireDate || barber.hireDate;
    barber.specialties = specialties || barber.specialties;

    await barber.save();
    res.status(200).json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating barber' });
  }
};

exports.deleteBarber = async (req, res) => {
  try {
    const { id } = req.params;
    const barber = await Barber.findByPk(id);
    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' });
    }

    await barber.destroy();
    res.status(204).json({ message: 'Barber deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting barber' });
  }
};