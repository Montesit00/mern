const Tarea = require("../models/model.tarea");

const ctrlTarea = {}

ctrlTarea.getTarea = async (req,res) => {
    try {
        const tarea = await Tarea.find({active: true});
        if (tarea.length === 0) {
            return res.json({
                msg: "No tiene tareas creadas"
            })
        }
        return res.json(tarea);
    } catch (error) {
        res.json({
            msg: "hubo un problema al cargar las tareas"
        });
    }
};

ctrlTarea.postTarea = async (req,res)=>{
    const {titulo,descripcion,estado} = req.body;
    const newTarea = new Tarea({
        titulo,
        descripcion,
        estado
    });

    const nuevaTarea = await newTarea.save();
    return res.json({msg: 'Tarea creada correctamente'})
}

ctrlTarea.deleteTarea = async (req,res)=>{
    const id = req.params.id;

    try {
        await Tarea.findByIdAndDelete(id,{isActive:false});
        return res.json({msg: 'Tarea eliminada correctamente'});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg:'Error al eliminar la tarea'});
    };
};

module.exports= ctrlTarea;