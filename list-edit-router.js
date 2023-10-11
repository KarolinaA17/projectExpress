const express = require("express");
const router = express.Router();
const proyectoexpress = require(`/proyectoexpress`);

// Ruta para crear una tarea (POST)
router.post("/añadirTarea", proyectoexpress.añadirTarea);

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
