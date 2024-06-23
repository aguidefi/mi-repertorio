const fs = require('fs')
const express = require('express')

const port = 3000;

const app = express();

//Middleware
app.use(express.json());

//Levantar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
})

//Devolver una página web
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

//Devolver un archivo
app.get('/canciones', (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync('canciones.json','utf-8'))
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({message: 'El recurso no está disponible'})
  }
});

//Crear un archivo
app.post('/canciones', (req, res) => {
  try {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json','utf-8'));
    canciones.push(cancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    res.status(201).send('Canción creada con éxito')
  } catch (error) {
    res.status(500).json({message: 'El recurso no está disponible'})
  }
});

//Actualizar un archivo
app.put('/canciones/:id', (req, res) => {
  const id = req.params.id;
  const canciones = JSON.parse(fs.readFileSync('canciones.json','utf-8'));
  const nuevoArray = canciones.map((cancion) => {
    if (cancion.id == id) {
      return {
        ...cancion,
        titulo: req.body.titulo,
        artista: req.body.artista,
        tono: req.body.tono
      }
    } else {
      return cancion;
    }
  });
  fs.writeFileSync('canciones.json', JSON.stringify(nuevoArray));
  res.status(200).json({mensaje:'Canción actualizada con éxito', data: nuevoArray});
});

// delete 
app.delete('/canciones/:id', (req, res) => {
  try {
    const id = req.params.id;
    const canciones = JSON.parse(fs.readFileSync('canciones.json','utf-8'));
    const updatedCanciones = canciones.filter(cancion => cancion.id !== id);
    fs.writeFileSync('canciones.json', JSON.stringify(updatedCanciones));
    res.status(200).send('Canción eliminada con éxito');
  } catch (error) {
    res.status(500).json({message: 'El recurso no está disponible'});
  }
});