const express = require('express')

const app = express()
const port = 3000

const { dbConnection } = require ('./database/config');

app.use(express.json());

app.use('/api/auth', require('./src/routes/auth.routes'))


//agregado, en el video estaba asi
//async conectarDB () {
//  await dbConnection();
//}

  conectarDB () ;
  await dbConnection();



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})