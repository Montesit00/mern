const {model, Schema} = require('mongoose');

const tareaSchema = new Schema({
    titulo:{
        type: String,
        require: true
    },
    descripcion:{
        type:String,
        require: true
    },
    estado: { 
        type: String, 
        enum: ['pendiente', 'en proceso', 'completada'], 
        default: 'pendiente' 
    },
    active:{
        type:Boolean,
        require: true,
        default: true
    }
},{
    versionKey: false,
    timeseries: true
});

module.exports = model('Tarea', tareaSchema);