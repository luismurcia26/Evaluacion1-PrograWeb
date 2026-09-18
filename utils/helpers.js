// Valores permitidos, tal como los pide el enunciado
const PRIORIDADES_VALIDAS = ['alta', 'media', 'baja'];
const ESTADOS_VALIDOS = ['pendiente', 'en proceso', 'resuelta', 'cancelada'];

// Deja "  ALTA " como "Alta" para que todo se guarde con el mismo formato
const normalizar = (texto) => {
    const limpio = texto.trim().toLowerCase();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
};

// Revisa que el valor sea un string con contenido real (no vacío, no solo espacios).
// Si mandan un número, un booleano o undefined, esto devuelve false en vez de reventar.
const esTextoValido = (valor) => typeof valor === 'string' && valor.trim() !== '';

/**
 * Valida los datos para REGISTRAR una incidencia (POST /incidencias).
 * Devuelve { error, datos }:
 *   - error: mensaje si algo está mal, o null si todo bien
 *   - datos: los campos ya limpios, listos para guardar
 */
const validarIncidencia = (datos = {}) => {
    const camposObligatorios = ['empleado', 'area', 'descripcion', 'prioridad'];

    // Todos los campos son obligatorios y no se permiten cadenas vacías
    for (const campo of camposObligatorios) {
        if (!esTextoValido(datos[campo])) {
            return {
                error: `El campo "${campo}" es obligatorio y no puede estar vacío.`,
                datos: null
            };
        }
    }

    // La prioridad solo puede ser Alta, Media o Baja
    const prioridad = datos.prioridad.trim().toLowerCase();
    if (!PRIORIDADES_VALIDAS.includes(prioridad)) {
        return {
            error: 'La prioridad debe ser Alta, Media o Baja.',
            datos: null
        };
    }

    return {
        error: null,
        datos: {
            empleado: datos.empleado.trim(),
            area: datos.area.trim(),
            descripcion: datos.descripcion.trim(),
            prioridad: normalizar(prioridad)
        }
    };
};

module.exports = {
    validarIncidencia,
    esTextoValido,
    normalizar,
    PRIORIDADES_VALIDAS,
    ESTADOS_VALIDOS
};