const { response } = require('express');
const Profesor = require('../models/profesores');

const getProfesores = async (req, res = response) => {
    try {
        const profesores = await Profesor.find();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener profesores', error });
    }
};

const getProfesor = async (req, res = response) => {
    const { numPersonal } = req.params;
    try {
        const profesor = await Profesor.findOne({ numPersonal: parseInt(numPersonal) });
        if (!profesor) return res.status(404).json({ msg: 'Profesor no encontrado' });
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener profesor', error });
    }
};

const addProfesor = async (req, res = response) => {
    const { numPersonal, nombre, carrera, edad } = req.body;
    try {
        const nuevoProfesor = new Profesor({numPersonal, nombre, carrera, edad });
        await nuevoProfesor.save();
        res.status(201).json({
            msg: `El profesor ${nombre} ha sido creado`,
            profesor: nuevoProfesor
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ msg: 'el numero Personal ya existe' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', details: error.errors });
        }
        res.status(500).json({ msg: 'Error al crear el profesor', error });
    }
};


const updateProfesor = async (req, res = response) => {
    const { numPersonal } = req.params;
    const { nombre, carrera, edad } = req.body;
    try {
        const updatedProfesor = await Profesor.findOneAndUpdate(
            { numPersonal: parseInt(numPersonal) },
            { nombre, carrera, edad },
            { new: true, runValidators: true}
        );
        if (!updatedProfesor) {
            return res.status(404).json({ msg: 'profesor no encontrado' });
        }
        res.json({
            msg: `El profesor con matrícula ${matricula} ha sido actualizado`,
            profesor: updatedProfesor
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', details: error.errors });
        }
        res.status(500).json({ msg: 'Error al actualizar el profesor', error });
    }
};

const updateEdadProfesor = async (req, res = response) => {
    const { numPersonal } = req.params;
    const { edad } = req.body;
    try {
        const updatedProfesor = await Estudiante.findOneAndUpdate(
            { numPersonal: parseInt(numPersonal) },
            { edad },
            { new: true, runValidators: true }
        );
        if (!updatedProfesor) {
            return res.status(404).json({ msg: 'Profesor no encontrado' });
        }
        res.json({
            msg: `El profesor con numero personal ${numPersonal} ha sido actualizado`,
            nombre: updatedProfesor.nombre,
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el profesor', error });
    }
};

const deletedProfesor = async (req, res = response) => {
    const { numPersonal } = req.params;
    if (!numPersonal) {
        return res.status(400).json({ msg: 'Numero personal no válido' });
    }
    try {
        const deletedProfesor = await Profesor.findOneAndDelete({ numPersonal: numPersonal });
        if (!deletedProfesor) {
            return res.status(404).json({ msg: 'profesor no encontrado' });
        }
        res.status(200).json({
            msg: `El profesor con numero personal ${numPersonal} ha sido eliminado`,
            profesor: deletedProfesor
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el profesor', error });
    }
};

module.exports = {getProfesores,addProfesor,updateProfesor,
    updateEdadProfesor, deletedProfesor, getProfesor};