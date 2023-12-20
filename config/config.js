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
mysqlService: {
    host: process.env.MYSQL_SRV_HOST ,
    port: process.env.MYSQL_SRV_PORT,
},
post:{
    port: process.env.POST_PORT ,
},
cacheService:{
    host: process.env.MYSQL_SRV_HOST ,
    port: process.env.MYSQL_SRV_PORT,
}
};

module.exports = configApi;
