const { validarIncidencia } = require('../utils/helpers');

// base de datos temporal
const incidencias = [];

// 2. Crear función para el método get
const listarIncidencias = (req, res) => {

    // Simplemente devuelve el arreglo vacío en formato JSON
    res.json(incidencias);
};

// Función para registrar un nuevo problema (POST)
const registrarIncidencia = (req, res) => {

    // guarda los datos que el usuario mandó en una variable
    const datos = req.body;

    // validamos los datos usando la función que creamos en helpers.js
    const mensajeDeError = validarIncidencia(datos);
    if (mensajeDeError) {
        return res.status(400).json({ "mensaje": mensajeDeError });
    }
    

    //  Llenamos con datos del usuario
    const nuevaIncidencia = {
        id: incidencias.length + 1, // Inventa un ID automático
        empleado: datos.empleado,
        area: datos.area,
        descripcion: datos.descripcion,
        prioridad: datos.prioridad,
        estado: "Pendiente" // Todas inician en pendiente por defecto
    };

    //  Usamos el método push para agregar la nueva incidencia al arreglo
    incidencias.push(nuevaIncidencia);

    //  responde al usuario
    res.json({
        "mensaje": "Incidencia registrada con exito"
    });
};

// Función para buscar una incidencia específica por su ID (GET por ID)
const obtenerIncidenciaPorId = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const incidenciaEncontrada = incidencias.find(incidencia => incidencia.id === idBuscado);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ "mensaje": "Incidencia no encontrada" });
    }

    res.json(incidenciaEncontrada);
};

// Función para actualizar una incidencia (PUT)
const actualizarIncidencia = (req, res) => {
    // 1. Buscamos la incidencia por su ID, igual que en el GET
    const idBuscado = parseInt(req.params.id);
    const incidenciaEncontrada = incidencias.find(incidencia => incidencia.id === idBuscado);

    // 2. Si no existe, tiramos error 404
    if (!incidenciaEncontrada) {
        return res.status(404).json({ "mensaje": "Incidencia no encontrada" });
    }

    // 3. Atrapamos los datos nuevos que mandó el usuario
    const datosNuevos = req.body;

    // 4. Actualizamos el estado (y cualquier otro dato que nos manden)
    if (datosNuevos.estado) incidenciaEncontrada.estado = datosNuevos.estado;
    if (datosNuevos.prioridad) incidenciaEncontrada.prioridad = datosNuevos.prioridad;
    // (Puedes agregar más campos aquí si quieres)

    // 5. Devolvemos mensaje de éxito
    res.json({
        "mensaje": "Incidencia actualizada con éxito",
        "incidencia": incidenciaEncontrada
    });
};
// Función para eliminar una incidencia (DELETE)
const eliminarIncidencia = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    
    // Buscamos en qué POSICIÓN (índice) de la lista está ese reporte
    const indice = incidencias.findIndex(incidencia => incidencia.id === idBuscado);

    // Si findIndex devuelve -1, significa que no lo encontró
    if (indice === -1) {
        return res.status(404).json({ "mensaje": "Incidencia no encontrada" });
    }

    // Usamos splice para borrar 1 elemento en esa posición exacta
    incidencias.splice(indice, 1);

    // Confirmamos la eliminación
    res.json({
        "mensaje": "Incidencia eliminada con éxito"
    });
};

// Exportamos las funciones para que las rutas las puedan usar
module.exports = {
    listarIncidencias,
    registrarIncidencia,
    obtenerIncidenciaPorId,
    actualizarIncidencia,
    eliminarIncidencia
};
