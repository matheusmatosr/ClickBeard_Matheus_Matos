const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.delete('/:id', appointmentController.cancelAppointment);
router.put('/appointments/:id', appointmentController.updateAppointment); 

module.exports = router;