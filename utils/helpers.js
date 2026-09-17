// Función para validar que los datos del reporte vengan correctos
const validarIncidencia = (datos) => {
   
    // 1. Revisamos que ningún campo venga vacío
    if (!datos.empleado || !datos.area || !datos.descripcion || !datos.prioridad) {
        return "Error: Todos los campos (empleado, area, descripcion, prioridad) son obligatorios.";
    }

    // 2. Revisamos que la prioridad sea válida (usamos toLowerCase para evitar errores de mayúsculas)
    const prioridadLimpia = datos.prioridad.trim().toLowerCase();
    if (prioridadLimpia !== "alta" && prioridadLimpia !== "media" && prioridadLimpia !== "baja") {
        return "Error: La prioridad debe ser estrictamente Alta, Media o Baja.";
    }

    // Si pasa todas las pruebas, devolvemos null (que significa "no hay errores")
    return null;
};

// Exportamos
module.exports = {
    validarIncidencia
};