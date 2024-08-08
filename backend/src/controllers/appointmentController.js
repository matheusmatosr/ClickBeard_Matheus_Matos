const { Appointment, Barber, Client } = require('../models');
const { Op } = require('sequelize');  

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

    // Verifica se o horário já está ocupado
    const existingAppointment = await Appointment.findOne({
      where: {
        barberId,
        date: {
          [Op.between]: [
            new Date(new Date(date).getTime() - 30 * 60 * 1000), // 30 minutos antes
            new Date(new Date(date).getTime() + 30 * 60 * 1000)  // 30 minutos depois
          ]
        }
      }
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Barber is already booked at this time' });
    }

    // Cria o novo agendamento
    const appointment = await Appointment.create({ barberId, clientId, date, status: 'Agendado' });

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error creating appointment' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: [Barber, Client] });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);
    const hoursDifference = (appointmentDate - currentDate) / (1000 * 60 * 60);

    if (hoursDifference < 2) {
      return res.status(400).json({ error: 'Não é possível cancelar o agendamento com menos de 2 horas de antecedência' });
    }

    appointment.status = 'Cancelled';
    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cancelar o agendamento' });
  }
};
