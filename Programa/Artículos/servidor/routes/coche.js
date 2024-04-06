// Rutas para coche
const express = require('express');
const router = express.Router();
const cocheController = require('../controllers/cocheController');

// /coches
router.post('/', cocheController.crearCoche);
router.get('/', cocheController.obtenerCoches);
router.get('/buscar-coches/id/:id', cocheController.obtenerCochesPorId);
router.get('/buscar-coches/marca/:marca', cocheController.obtenerCochesPorMarca);
router.put('/:id', cocheController.actualizarCoche);
router.get('/:id', cocheController.obtenerCoche);
router.delete('/:id', cocheController.eliminarCoche);

module.exports = router;