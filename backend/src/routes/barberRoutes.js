const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');

router.post('/', barberController.createBarber);
router.get('/', barberController.getBarbers);

module.exports = router;