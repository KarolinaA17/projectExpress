const express = require(`express`);
const listViewRouter = express.Router();

//Ruta ver lista de Tareas (GET)
listViewRouter.get("/listaDeTareas", (req, res) => {
  const { listaDeTareas } = require(`./proyectoexpress`);
  res.json(listaDeTareas);
});

//Ruta para ver una sola tarea (GET)

listViewRouter.get(`/unicaTarea/:id`, (req, res) => {
  const { listaDeTareas } = require(`./proyectoexpress`);
  const tareaId = req.body.indicador;
  const tarea = listaDeTareas.find((task) => task.id === tareaId);
  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
});

//ver lista tareas completadas
listViewRouter.get(`/completado`, (req, res) => {
  const { listaDeTareas } = require(`./proyectoexpress`);
  const tareasCompletadas = listaDeTareas.filter(
    (tarea) => tarea.estado === true
  );
  res.json(tareasCompletadas);
});

//ver lista tareas incompletas

listViewRouter.get(`/incompleto`, (req, res) => {
  const { listaDeTareas } = require(`./proyectoexpress`);
  const tareasIncompletas = listaDeTareas.filter(
    (tarea) => tarea.estado === false
  );
  res.json(tareasIncompletas);
});

module.exports = listViewRouter;
