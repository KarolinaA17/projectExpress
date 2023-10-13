const express = require("express");
const listEditRouter = express.Router();

// Ruta para crear una tarea (POST)
listEditRouter.post("/agregartarea", (req, res) => {
  const { agregarTarea } = require(`./proyectoexpress`);
  const indicador = req.body.indicador;
  const descripcion = req.body.descripcion;
  const estado = req.body.estado;
  agregarTarea(indicador, descripcion, estado);
  res.send(`Tarea agregada`);
});

// Ruta para eliminar una tarea (DELETE)
listEditRouter.delete("/eliminartarea/:indicador", (req, res) => {
  const { eliminarTarea } = require(`./proyectoexpress`);
  const indicador = req.params.indicador;
  eliminarTarea(indicador).then(() => {
    res.send(`Tarea ${indicador} eliminada`);
  });
});

// Ruta para actualizar una tarea (UPDATE)
listEditRouter.put("/actualizartarea/:indicador", (req, res) => {
  const { actualizarTarea } = require(`./proyectoexpress`);
  const indicador = req.params.indicador;
  const nuevaDescripcion = req.body.nuevaDescripcion;
  const nuevoEstado = req.body.nuevoEstado;
  actualizarTarea(indicador, nuevaDescripcion, nuevoEstado);
  res.send(`Tarea ${indicador} actualizada`);
});

module.exports = listEditRouter;
