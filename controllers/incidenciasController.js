const { validarIncidencia, esTextoValido, normalizar } = require('../utils/helpers');//importar

// base de datos temporal
const incidencias = [];

// Contador que solo sube. 
let siguienteId = 1;

// GET /lista todas las incidencias
const listarIncidencias = (req, res) => {
    res.json(incidencias);
};

// POST /registra una nueva incidencia
const registrarIncidencia = (req, res) => {
    const { error, datos } = validarIncidencia(req.body);
    if (error) {
        return res.status(400).json({ mensaje: error });
    }

    const nuevaIncidencia = {
        id: siguienteId++,
        ...datos,
        estado: 'Pendiente' // todas inician en pendiente por defecto
    };

    incidencias.push(nuevaIncidencia); //guarda la incidencia en el arreglo temporal

    res.status(201).json({ mensaje: 'Incidencia registrada correctamente' });//responde
};

// GET /incidencias/:id para id especifico
const obtenerIncidenciaPorId = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const incidenciaEncontrada = incidencias.find(incidencia => incidencia.id === idBuscado);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    res.json(incidenciaEncontrada);
};

// PUT /incidencias/:id/estado cambia solo el estado, usando switch
const cambiarEstado = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const incidenciaEncontrada = incidencias.find(incidencia => incidencia.id === idBuscado);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    if (!esTextoValido(req.body.estado)) {
        return res.status(400).json({ mensaje: 'El campo "estado" es obligatorio y no puede estar vacío.' });
    }

    const estadoNormalizado = normalizar(req.body.estado);

    // switch para validar y cambiar el estado
    switch (estadoNormalizado) {
        case 'Pendiente':
        case 'En proceso':
        case 'Resuelta':
        case 'Cancelada':
            incidenciaEncontrada.estado = estadoNormalizado;
            break;
        default:
            return res.status(400).json({
                mensaje: 'Estado inválido. Debe ser Pendiente, En Proceso, Resuelta o Cancelada.'
            });
    }

    res.json({
        mensaje: 'Estado actualizado correctamente',
        incidencia: incidenciaEncontrada
    });
};

// DELETE elimina una incidencia (uso de findIndex() + splice())
const eliminarIncidencia = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const indice = incidencias.findIndex(incidencia => incidencia.id === idBuscado);
//se usan findIndex() para obtener el índice de la incidencia en el arreglo y splice() para eliminarla. 
// Si no se encuentra, devuelve un error 404.

    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    incidencias.splice(indice, 1);

    res.json({ mensaje: 'Incidencia eliminada con éxito' });
};

// GET /estadisticas devuelve un objeto con el total de incidencias
const obtenerEstadisticas = (req, res) => {
    // filter() nos regresa un nuevo arreglo con solo los que cumplen la condición;
    // .length nos dice cuántos hay.
    res.json({
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter(incidencia => incidencia.estado === 'Pendiente').length,
        enProceso: incidencias.filter(incidencia => incidencia.estado === 'En proceso').length,
        resueltas: incidencias.filter(incidencia => incidencia.estado === 'Resuelta').length,
        canceladas: incidencias.filter(incidencia => incidencia.estado === 'Cancelada').length
    });
};

// GET /incidencias/:id/clasificacion
const clasificarIncidencia = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const incidenciaEncontrada = incidencias.find(incidencia => incidencia.id === idBuscado);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    let clasificacion;

    switch (incidenciaEncontrada.prioridad) {
        case 'Alta':
            clasificacion = 'Crítica';
            break;
        case 'Media':
            clasificacion = 'Importante';
            break;
        case 'Baja':
            clasificacion = 'Normal';
            break;
        default:
            clasificacion = 'Sin clasificar';
    }

    res.json({
        id: incidenciaEncontrada.id,
        clasificacion
    });
};

module.exports = {
    listarIncidencias,
    registrarIncidencia,
    obtenerIncidenciaPorId,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencia
};