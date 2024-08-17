const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/register', clientController.registerClient);
router.get('/', clientController.getClients);
router.delete('/clients/:id', clientController.deleteClient); 
router.put('/clients/:id', clientController.updateClient); 

module.exports = router;
