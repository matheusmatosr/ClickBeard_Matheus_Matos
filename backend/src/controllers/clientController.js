const { Client } = require('../models');
const bcrypt = require('bcrypt');

exports.registerClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await Client.create({ name, email, password: hashedPassword });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error registering client' });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching clients' });
  }
};
