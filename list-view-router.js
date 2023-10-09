const { Router } = require("express");
const port = 8000;

app.listen(port, () => {
  console.log(`Servidor corriendo en https://localhost:${port}`);
});

Router.param(function (param, Completado) {
  return function (req, res, next, status) {
    if (status === Completado) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
});

Router.param(`estado`, `Completado`);

Router.get(`/listaDeTareas/:estado`, function (req, res) {
  res.send("Tareas completadas");
});

app.use(Router);
