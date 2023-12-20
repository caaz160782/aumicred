const express = require('express');

const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const configApi = require('../config/config');

const auth = require('./components/auth/network');
const post = require('./components/post/network');
const user= require('./components/user/network')
const errors = require('../network/errors');

const port= configApi.ApiPort;
const app =express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(port, () =>{
    console.log("Api escuchando en el puerto ", port);
})