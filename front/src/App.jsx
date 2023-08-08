import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
   const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente'
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNuevaTarea(prevTarea => ({ ...prevTarea, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
  
    try {
      const res = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });
  
      if (res.ok) {
        console.log('Tarea creada exitosamente');
      } else {
        console.error('Error al crear la tarea');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  
  const eliminarTarea = async (id) => {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
      });
      obtenerTareas();
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerTareas = async () => {
    fetch('http://localhost:3000/') 
      .then(data => data.json())
      .then(response => {
        setTareas(response)
      })
      .catch(error => console.error('Error al hacer el fech:', error))
  }

  useEffect(() => {
    obtenerTareas()
  }, []);
  

  return(
    <>
      <div className="container">
        <h1>TP: Tareas</h1>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={nuevaTarea.titulo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <input
              name="descripcion"
              id="descripcion"
              type="text"
              value={nuevaTarea.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="estado">Estado:</label>
            <select name="estado" id="estado" value={nuevaTarea.estado} onChange={handleInputChange}>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <button type="submit" className='buttonEnviar'>Agregar Tarea</button>
        </form>
        <ul className="lista">
          {tareas.map(task => (
            <li key={task._id} className="item">
              <strong>{task.titulo}</strong>
              <p>{task.descripcion}</p>
              <p>Estado: {task.estado}</p>
              <button className='button' onClick={() => eliminarTarea(task._id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App;
