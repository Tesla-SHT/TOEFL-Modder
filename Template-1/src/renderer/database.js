const { Client } = require('pg')
const config = require('../../config.json')

var connectionInfo = {  
  host: config.host, 
  database: config.database,    
  user: config.user, 
  password: config.password,  
  port: config.port
} 

const tableQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
const client = new Client(connectionInfo)
client.connect()
client.query(tableQuery)
.then(result => {
  console.log('DB Tables: ' + JSON.stringify(result.rows));
  client.end()    
}).catch(err => {
  console.log(err)
  client.end()    
})   
