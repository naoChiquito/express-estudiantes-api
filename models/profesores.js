const { Schema, model } = require('mongoose');

const ProfesorSchema = Schema({
    numPersonal: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    edad: {
        type: Number
    }
});

module.exports = model('Profesor', ProfesorSchema);