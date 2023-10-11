const express = require(`express`);
const listViewRouter = express.Router();

//ver lista tareas completadas
listViewRouter.get(`/completado`, (req, res) => {
  const { listaDeTareas } = require(`./proyectoexpress`);
  const tareasCompletadas = listaDeTareas.filter(
    (tarea) => tarea.estado === true
  );
  res.json(tareasCompletadas);
});

//ver lista tareas completadas
listViewRouter.get(`/incompleto`, (req, res) => {
  const { tareas } = require(`./proyectoexpress`);
  const tareasIncompletas = tareas.filter((tarea) => tarea.estado === false);
  res.json(tareasIncompletas);
});

module.exports = listViewRouter;
