const express = require('express');//importar express
const app = express();

// 1. le enseña a Express que vamos a recibir JSON en el body de las peticiones
app.use(express.json());

// 2. Importamos las rutas y el controlador
const rutasIncidencias = require('./routes/incidencias');
const controlador = require('./controllers/incidenciasController');

// 3. DELEGACION Cualquier petición que empiece con /incidencias va a ese archivo
app.use('/incidencias', rutasIncidencias);

// 4. Endpoint de estadísticas (va en la raíz, según el enunciado: GET /estadisticas)
app.get('/estadisticas', controlador.obtenerEstadisticas);

// 5. Enciende el servidor
app.listen(3000, () => {
    console.log(`servidor listo en http://localhost:3000/incidencias`);
});