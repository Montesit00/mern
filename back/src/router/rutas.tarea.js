const routerTarea = require('express').Router();

const {
    getTarea,
    postTarea,
    deleteTarea
} = require('../controllers/control.tarea');

routerTarea.get('/',getTarea)
routerTarea.post('/',postTarea)
routerTarea.delete('/:id',deleteTarea)

module.exports = routerTarea;