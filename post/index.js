const express = require('express');
const bodyParser = require('body-parser');

const configApi = require('../config/config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(configApi.post.port, () => {
    console.log('Servicio posts escuchando en el puerto ', configApi.post.port);
});