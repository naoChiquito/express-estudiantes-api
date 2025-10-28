const express = require('express');
const router = express.Router();
const{
    getProfesores,addProfesor,updateProfesor,
    updateEdadProfesor, deletedProfesor, getProfesor
} = require('../controllers/profesores');

router.get('/', getProfesores);
router.get('/:numPersonal', getProfesor);
router.post('/', addProfesor);
router.put('/:numPersonal', updateProfesor);
router.patch('/:numPersonal', updateEdadProfesor);
router.delete('/:numPersonal', deletedProfesor);

module.exports = router;