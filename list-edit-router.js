const express = require("express");
const router = express.Router();

// Ruta para crear una tarea (POST)
router.post("/crear-tarea", (req, res) => {
  // Código para crear una tarea
  res.send("Tarea creada");
});

// Ruta para eliminar una tarea (DELETE)
router.delete("/eliminar-tarea/:id", (req, res) => {
  const tareaId = req.params.id;
  // Código para eliminar la tarea con el ID proporcionado
  res.send(`Tarea ${tareaId} eliminada`);
});

// Ruta para actualizar una tarea (UPDATE)
router.put("/actualizar-tarea/:id", (req, res) => {
  const tareaId = req.params.id;
  // Código para actualizar la tarea con el ID proporcionado
  res.send(`Tarea ${tareaId} actualizada`);
});

module.exports = router;
