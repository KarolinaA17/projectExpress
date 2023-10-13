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
  eliminarTarea(indicador);
  res.send(`Tarea ${indicador} eliminada`);
});

// Ruta para actualizar una tarea (UPDATE)
listEditRouter.put("/actualizar-tarea", (req, res) => {
  const { actualizarTarea } = require(`./proyectoexpress`);
  const nuevaDescripcion = req.params.indicador;
  const nuevoEstado = req.params.estado;
  actualizarTarea(descripcion, estado);
  res.send(`Tarea ${tareaId} actualizada`);
});

module.exports = listEditRouter;
