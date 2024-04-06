// Rutas para usuario
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//usuarios, van a usuarioController.js
router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuarios);
router.get('/buscar-usuarios/id/:id', usuarioController.obtenerUsuariosPorId);
router.get('/buscar-usuarios/id2/:id', usuarioController.obtenerUsuariosRolPorId);
router.get('/buscar-usuarios/rol/:rol', usuarioController.obtenerUsuariosPorRol);
router.put('/:id', usuarioController.actualizarUsuario); //Put para actualizar, le pasamos el ID
router.get('/:id', usuarioController.obtenerUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;