// Rutas para coche
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

// /coches
router.post('/', compraController.crearCompra);
router.get('/', compraController.obtenerCompras);
router.get('/buscar-compras/id/:id', compraController.obtenerComprasPorId);
router.get('/buscar-compras/NombreCliente/:NombreCliente', compraController.obtenerComprasPorNombreCliente);
router.get('/buscar-compras/id_usuario/:id_usuario', compraController.getComprasPorID_Usuario);
router.put('/:id', compraController.actualizarCompra);
router.get('/:id', compraController.obtenerCompra);
router.delete('/:id', compraController.eliminarCompra);

module.exports = router;