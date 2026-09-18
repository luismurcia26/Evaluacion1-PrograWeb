const express = require('express');
const router = express.Router();

// Importamos el controlador
const controlador = require('../controllers/incidenciasController');


// Listar todas las incidencias
router.get('/', controlador.listarIncidencias);

// Buscar una incidencia por su ID
router.get('/:id', controlador.obtenerIncidenciaPorId);

// Clasificación automática según prioridad (switch)
router.get('/:id/clasificacion', controlador.clasificarIncidencia);

// Registrar una nueva incidencia
router.post('/', controlador.registrarIncidencia);

// Cambiar el estado de una incidencia (switch)
router.put('/:id/estado', controlador.cambiarEstado);

// Eliminar una incidencia
router.delete('/:id', controlador.eliminarIncidencia);

module.exports = router;