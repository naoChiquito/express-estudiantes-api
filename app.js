const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//--> const mongoDBURI = 'mongodb://usuario:pass@localhost:27017/estudiantesDB';
const mongoDBURI = 'mongodb+srv://naomichiquito06_db_user:iluHtzfnBELe6W49@cluster0.wn0hbms.mongodb.net/?appName=Cluster0';

mongoose.connect(mongoDBURI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));


app.use('/api/estudiantes', require('./routes/estudiantes'));
app.use('/api/profesores', require('./routes/profesores'));


app.listen(3033, () => {
    console.log('Servidor ejecutándose en http://localhost:3033');
});
