const express = require('express');
const app = express();

// 1. Le enseñamos a Express a entender JSON
app.use(express.json());

// 2. Importamos las rutas que creaste
const rutasIncidencias = require('./routes/incidencias');

// 3. Le decimos a Express: "Cualquier petición que empiece con /incidencias, mándala a ese archivo"
app.use('/incidencias', rutasIncidencias);

// 4. Encendemos el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`¡Servidor listo! Prueba entrar a http://localhost:${PORT}/incidencias`);
});