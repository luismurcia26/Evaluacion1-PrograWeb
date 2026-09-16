// 1. base de datos temporal
const incidencias = [];

// 2. Crear función para el método get
const listarIncidencias = (req, res) => {
    // Simplemente devuelve el arreglo vacío en formato JSON
    res.json(incidencias);
};
// Función para registrar un nuevo problema (POST)
const registrarIncidencia = (req, res) => {
    // 1. Atrapamos los datos que el empleado envió desde internet
    const datos = req.body;

    // 2. Llenamos nuestro "molde" con esos datos
    const nuevaIncidencia = {
        id: incidencias.length + 1, // Inventamos un ID automático
        empleado: datos.empleado,
        area: datos.area,
        descripcion: datos.descripcion,
        prioridad: datos.prioridad,
        estado: "Pendiente" // Todas inician en pendiente por defecto
    };

    // 3. Usamos el método push para empujar este nuevo objeto adentro de nuestra caja
    incidencias.push(nuevaIncidencia);

    // 4. Le respondemos al empleado con el mensaje de éxito que pide el profesor
    res.json({
        "mensaje": "Incidencia registrada correctamente"
    });
};
// Exportamos las funciones para que las rutas las puedan usar
module.exports = {
    listarIncidencias,
    registrarIncidencia // Agregas esta línea
};