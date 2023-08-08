const express = require('express');
const path = require('path')
const cors = require('cors');
const morgan = require('morgan');

const conexion= require("./src/connection/conexion")
require('dotenv').config();

const data = express();
conexion();

const port = process.env.PORT || 3000

data.use(cors());
data.use(morgan('dev'));
data.use(express.json());

data.use(express.static(path.join(__dirname, "public")))

data.use(require('./src/router/rutas.tarea'))

data.listen(port,()=>{
    console.log('Servidor funcionando')
})