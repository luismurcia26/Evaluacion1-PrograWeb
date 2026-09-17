const express = require('express');
const router = express.Router();

// 1. Importamos el cerebro (controlador)
const controlador = require('../controllers/incidenciasController');

// 2. Si alguien hace una petición GET a la raíz, lista todas las incidencias
router.get('/', controlador.listarIncidencias);

// Buscar una sola incidencia por su ID <---
router.get('/:id', controlador.obtenerIncidenciaPorId);

// Actualizar una incidencia por su ID (PUT) <---
router.put('/:id', controlador.actualizarIncidencia);

// 3. Si alguien manda datos nuevos (POST), ejecuta la función de registrar
router.post('/', controlador.registrarIncidencia);

router.delete('/:id', controlador.eliminarIncidencia);

// 4. Exportamos el router
module.exports = router;