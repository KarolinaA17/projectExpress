const express = require("express");
const listEditRouter = express.Router();

//MIDDLEWARES POST - PUT

function cuerpoVacio(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    if (Object.keys(req.body).length === 0) {
      res
        .status(400)
        .json({ error: "Se necesita un indicador, descripcion y estado" });
    } else {
      next();
    }
  } else {
    next();
  }
}

function infoNoValida(req, res, next) {
  if (!indicador || !descripcion || !estado) {
    res.status(400).json({
      error: "Información no valida o atributos faltantes.",
    });
    next();
  } else {
    next();
  }
}

// Ruta para crear una tarea (POST)
listEditRouter.post("/agregartarea", cuerpoVacio, infoNoValida, (req, res) => {
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
listEditRouter.put(
  "/actualizartarea/:indicador",
  cuerpoVacio,
  infoNoValida,
  (req, res) => {
    const { actualizarTarea } = require(`./proyectoexpress`);
    const indicador = req.params.indicador;
    const nuevaDescripcion = req.body.nuevaDescripcion;
    const nuevoEstado = req.body.nuevoEstado;
    actualizarTarea(indicador, nuevaDescripcion, nuevoEstado);
    res.send(`Tarea ${indicador} actualizada`);
  }
);

module.exports = listEditRouter;
