const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');

router.post('/', barberController.createBarber);
router.get('/', barberController.getBarbers);
router.delete('/barbers/:id', barberController.deleteBarber); 
router.put('/barbers/:id', barberController.updateBarber); 

module.exports = router;