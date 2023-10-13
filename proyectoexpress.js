const fs = require("fs");
const { resolve } = require("path");
const readline = require("readline");

const express = require(`express`);
const app = express();
const port = 8000;

//Ruta para mandar a post
const bodyParser = require(`body-parser`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Ruta para mandar a post
const params = require(`params`);

//Constantes para los routers
const listViewRouter = require(`./list-view-router`);
const listEditRouter = require(`./list-edit-router`);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Rutas para los routers
app.use(`/list-view`, listViewRouter);
app.use(`/list-edit`, listEditRouter);

//Ruta para mandar lista de tareas en formato JSON
app.get("/listaDeTareas", (req, res) => {
  res.json(listaDeTareas);
});

const leerDatos = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let listaDeTareas = [
  {
    indicador: 1,
    descripcion: "Hacer aseo a la casa",
    estado: true,
  },
  {
    indicador: 2,
    descripcion: "Ir al supermercado",
    estado: true,
  },
  {
    indicador: 3,
    descripcion: "Organizar mercado",
    estado: true,
  },
  {
    indicador: 4,
    descripcion: "Hacer el almuerzo",
    estado: false,
  },
  {
    indicador: 5,
    descripcion: "Sacar los perros al parque",
    estado: false,
  },
];

function agregarTarea(indicador, descripcion, estado) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevaTarea = {
        indicador: indicador,
        descripcion: descripcion,
        estado: estado,
      };
      listaDeTareas.push(nuevaTarea);
      console.log(`tarea "${descripcion}" agregada.`);
      resolve();
    }, 2000);
  });
}

async function marcarComoCompletada(indice, tareas) {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (indice >= 1 && indice <= tareas.length) {
          // Corregir la condición
          tareas[indice - 1].estado = "completado";
          console.log(
            `Tarea "${listaDeTareas[indice - 1].descripcion}" completada.`
          );
          resolve();
        } else {
          console.log("Índice de tarea no válido.");
          reject("Índice de tarea no válido.");
        }
      }, 2000);
    });
  } catch (error) {
    console.error("Error al marcar la tarea como completada:", error);
  }
}

function actualizarTarea(indicador, nuevaDescripcion, nuevoEstado) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tarea = listaDeTareas.find(
        (tarea) => tarea.indicador === indicador
      );
      if (tarea) {
        tarea.descripcion = nuevaDescripcion;
        tarea.estado = nuevoEstado;
        console.log(`Tarea actualizada: ${nuevaDescripcion}, ${nuevoEstado}`);
        resolve();
      } else {
        console.log(`Tarea no encontrada en la lista`);
        reject();
      }
    }, 2000);
  });
}

function eliminarTarea(indice) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (indice >= 1 && indice <= listaDeTareas.length) {
        // Corregir la condición
        const tareaEliminada = listaDeTareas.splice(indice - 1, 1); // Restar 1 al índice
        console.log(
          "Tarea eliminada con éxito:",
          tareaEliminada[0].descripcion
        );
        resolve();
      } else {
        console.log("Índice fuera de rango. La tarea no se pudo eliminar.");
        reject("Índice fuera de rango"); // Agregar un mensaje de error y llamar a 'reject'
      }
    }, 1000);
  }).catch((error) => {
    console.error("Error al eliminar la tarea:", error);
  });
}

//Ruta para mandar funciones
module.exports = { listaDeTareas, agregarTarea, eliminarTarea };
