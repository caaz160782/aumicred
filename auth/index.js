const jwt = require('jsonwebtoken');
const configApi = require('../config/config');
const error = require('../utils/error');

const secret = configApi.jwtSecret;

 function sign(data) {
    let jsonData = JSON.parse(JSON.stringify(data));
    const token = jwt.sign(jsonData, secret);   
    return token
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
         //   throw new Error('No puedes hacer esto');
        }
    },
    
    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    },
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};