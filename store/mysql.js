const mysql = require('mysql');

const configApi = require('../config/config');

const dbconf = {
    host: configApi.mysql.host,
    user: configApi.mysql.user,
    password: configApi.mysql.password,
    database: configApi.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    const sqlQuery=`INSERT INTO ${table} SET ?`   
    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
      
        const sqlQuery=`UPDATE ${table} SET ? WHERE id=?`
        console.log(sqlQuery)
        connection.query(sqlQuery, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

async function upsert(table, data) {
    let lista = await list(table);
    let data_id = [];
    for (let key in lista) {
        if (data.id === lista[key].id) {
            data_id.push(lista[key].id)
        }
    }
    // console.log(data_id.length)
    if (data_id.length > 0) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}
function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
};