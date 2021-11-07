
const sql = require('mssql/msnodesqlv8')

const config = {
     server: 'localhost', 
     database: 'DB_DATH1',
     driver: 'msnodesqlv8',
     options: {
       trustedConnection: true
     }
} 

module.exports=config;


 

