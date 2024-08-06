const { Appointment, Barber, Client } = require('../models');

exports.createAppointment = async (req, res) => {
  try {
    const { barberId, clientId, date, specialty } = req.body;

    const barber = await Barber.findByPk(barberId);
    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' });
    }

    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    console.log('Barber specialties:', barber.specialties);

    const barberSpecialties = barber.specialties || [];
    const specialtyExists = barberSpecialties.includes(specialty);

    if (!specialtyExists) {
      return res.status(404).json({ error: 'Barber does not have this specialty' });
    }

    const appointmentExists = await Appointment.findOne({ where: { barberId, date } });
    if (appointmentExists) {
      return res.status(400).json({ error: 'Appointment already exists at this time' });
    }
    
    const appointment = await Appointment.create({ barberId, clientId, date, status: 'Scheduled' });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Error creating appointment' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: [Barber, Client] });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);
    const hoursDifference = (appointmentDate - currentDate) / (1000 * 60 * 60);

    if (hoursDifference < 2) {
      return res.status(400).json({ error: 'Cannot cancel appointment within 2 hours' });
    }

    appointment.status = 'Cancelled';
    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Error cancelling appointment' });
  }
};