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

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    client.name = name || client.name;
    client.email = email || client.email;
    if (password) {
      client.password = await bcrypt.hash(password, 10);
    }

    await client.save();
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating client' });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await client.destroy();
    res.status(204).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting client' });
  }
};