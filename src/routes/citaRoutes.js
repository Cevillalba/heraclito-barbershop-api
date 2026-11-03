const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.post('/agendar', citaController.crearCita);
router.get('/', citaController.listarCitas);

module.exports = router;