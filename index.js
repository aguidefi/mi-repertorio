const fs = require('fs')
const express = require('express')

const port = 3000;

const app = express();

//Levantar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
})

//Devolver una página web
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
