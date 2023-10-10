const { Router } = require("express");
const listViewRouter = express.Router();

//ver lista tareas completadas
listViewRouter.get(`/completado`, (req, res) => {
  const { listaDeTareas } = require(`./proyectoexpress`);
  const tareasCompletadas = listaDeTareas.filter(
    (listaDeTareas) => listaDeTareas.Completado
  );
  res.json(tareasCompletadas);
});

//ver lista tareas completadas
listViewRouter.get(`/incompleto`, (req, res) => {
  const { listaDeTareas } = require(`./proyectoexpress`);
  const tareasIncompletas = listaDeTareas.filter(
    (listaDeTareas) => !listaDeTareas.Completado
  );
  res.json(tareasIncompletas);
});

module.exports = listViewRouter;
