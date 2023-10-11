const express = require("express");
const addTask = express.Router();
const añadirTarea = require("proyectoexpress");
//Middleware para procesar JSON en las solicitudes POST
application.use(express.json());

// Ruta para crear una tarea (POST)
addTask.post("/añadirTarea", (req, res) => {
  const { añadirTarea } = require(`/proyectoexpress`);
  const indicador = req.body.indicador;
  const descripcion = req.body.descripcion;
  const estado = req.body.estado;
  añadirTarea(indicador, descripcion, estado);
  res.send(`Tarea agregada`);
});

// Ruta para eliminar una tarea (DELETE)
router.delete("/eliminar-tarea/:id", (req, res) => {
  const tareaId = req.params.id;

  res.send(`Tarea ${tareaId} eliminada`);
});

// Ruta para actualizar una tarea (UPDATE)
router.put("/actualizar-tarea/:id", (req, res) => {
  const tareaId = req.params.id;

  res.send(`Tarea ${tareaId} actualizada`);
});

module.exports = router;
