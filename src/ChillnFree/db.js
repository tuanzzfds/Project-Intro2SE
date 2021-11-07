const sql = require('mssql/msnodesqlv8')

const config = {
     server: 'localhost', 
     database: 'ChillnFree',
     driver: 'msnodesqlv8',
     options: {
       trustedConnection: true
     }
} 

module.exports=config;