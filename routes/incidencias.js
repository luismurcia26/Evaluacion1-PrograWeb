const express = require('express');
const router = express.Router();

// 1. Importamos el cerebro que acabas de crear
const controlador = require('../controllers/incidenciasController');

// 2. Si alguien hace una petición GET a la raíz de esta ruta, ejecuta la función del controlador
router.get('/', controlador.listarIncidencias);

// Si alguien manda datos nuevos (POST), ejecuta la función de registrar
router.post('/', controlador.registrarIncidencia);

// 3. Exportamos el router
module.exports = router;