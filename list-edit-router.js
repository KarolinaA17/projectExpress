const express = require("express");
const listEditRouter = express.Router();

// Ruta para crear una tarea (POST)
listEditRouter.post("/agregarTarea", (req, res) => {
  const { agregarTarea } = require(`./proyectoexpress`);
  const indicador = req.body.indicador;
  const descripcion = req.body.descripcion;
  const estado = req.body.estado;
  agregarTarea(indicador, descripcion, estado);
  res.send(`Tarea agregada`);
});

// Ruta para eliminar una tarea (DELETE)
listEditRouter.delete("/eliminar-tarea", (req, res) => {
  const { eliminarTarea } = require(`./proyectoexpress`);
  const indicador = req.params.indicador;
  const descripcion = req.params.descripcion;
  const estado = req.params.estado;
  eliminarTarea(indicador, descripcion, estado);
  res.send(`Tarea ${tareaId} eliminada`);
});

// Ruta para actualizar una tarea (UPDATE)
listEditRouter.put("/actualizar-tarea/:id", (req, res) => {
  const tareaId = req.params.id;

  res.send(`Tarea ${tareaId} actualizada`);
});

module.exports = { listEditRouter };
