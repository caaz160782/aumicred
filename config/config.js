require("dotenv").config();

const configApi = {
 ApiPort: process.env.API_PORT,
 jwtSecret:process.env.JWT_SECRET,
 mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS ,
    database: process.env.MYSQL_DB,
},
};

module.exports = configApi;
