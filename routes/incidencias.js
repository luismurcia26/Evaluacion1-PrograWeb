const express = require('express');
const router = express.Router();

// 1. Importamos el cerebro (controlador)
const controlador = require('../controllers/incidenciasController');

// 2. Si alguien hace una petición GET a la raíz, lista todas las incidencias
router.get('/', controlador.listarIncidencias);

// ---> NUEVA RUTA: Buscar una sola incidencia por su ID <---
router.get('/:id', controlador.obtenerIncidenciaPorId);

// 3. Si alguien manda datos nuevos (POST), ejecuta la función de registrar
router.post('/', controlador.registrarIncidencia);

// 4. Exportamos el router
module.exports = router;