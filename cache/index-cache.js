const express = require('express');
const bodyParser = require('body-parser');

const configApi = require('../config/config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

// RUTAS
app.use('/', router)

app.listen(configApi.cacheService.port, () => {
    console.log('Servicio de caché redis escuchando en el puerto', configApi.cacheService.port);
})