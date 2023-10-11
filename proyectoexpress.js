const fs = require("fs");
const { resolve } = require("path");
const readline = require("readline");

const express = require(`express`);
const app = express();
const port = 8000;

//Constantes para los routers
const listViewRouter = require(`./list-view-router`);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Rutas para los routers
app.use(`/list-view`, listViewRouter);

//Ruta para mandar funcion de crear Tarea
module.exports = añadirTarea;

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

function menu() {
  return `
  seleccionar una de las opciones:
  1. Mirar lista de Tareas
  2. Agregar tarea
  3. Marcar tarea completa
  4. Actualizar Tarea
  5. Eliminar tarea
  `;
}

function imprimirlistaDeTareas(listaDeTareas) {
  console.log("LISTA DE TAREAS:");
  for (const tarea of listaDeTareas) {
    console.log(tarea);
  }
  mostrarMenu();
}
function añadirTarea(indicador, descripcion, estado) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevaTarea = {
        indicador: indicador,
        descripcion: descripcion,
        estado: estado,
      };
      listaDeTareas.push(nuevaTarea);
      console.log(`tarea "${descripcion}" agregada.`);
      mostrarMenu();
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
        mostrarMenu();
      }, 2000);
    });
  } catch (error) {
    console.error("Error al marcar la tarea como completada:", error);
    mostrarMenu();
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
      mostrarMenu();
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
      mostrarMenu();
    }, 1000);
  }).catch((error) => {
    console.error("Error al eliminar la tarea:", error);
    mostrarMenu();
  });
}

async function mostrarMenu() {
  console.log(menu());

  const opcion = await new Promise((resolve) => {
    leerDatos.question("Ingrese la opción deseada:", (opcion) => {
      resolve(opcion);
    });
  });

  switch (opcion) {
    case "1":
      imprimirlistaDeTareas(listaDeTareas);
      break;
    case "2":
      const indicador = await new Promise((resolve) => {
        leerDatos.question("Introduzca el indicador: ", (indicador) => {
          resolve(indicador);
        });
      });
      const descripcion = await new Promise((resolve) => {
        leerDatos.question("Introduzca la descripción: ", (descripcion) => {
          resolve(descripcion);
        });
      });
      const estado = await new Promise((resolve) => {
        leerDatos.question("Introduzca el estado: ", (estado) => {
          resolve(estado);
        });
      });
      await añadirTarea(indicador, descripcion, estado);
      break;
    case "3":
      const indiceCompleta = await new Promise((resolve) => {
        leerDatos.question(
          "Escriba el índice de la tarea para marcarla como completada: ",
          (indice) => {
            resolve(indice);
          }
        );
      });
      await marcarComoCompletada(indiceCompleta, listaDeTareas);
      break;
    case "4":
      const indicadorActualizar = await new Promise((resolve) => {
        leerDatos.question("Introduzca el indicador: ", (indicador) => {
          resolve(indicador);
        });
      });
      const nuevaDescripcion = await new Promise((resolve) => {
        leerDatos.question(
          "Introduzca la nueva descripción: ",
          (descripcion) => {
            resolve(descripcion);
          }
        );
      });
      const nuevoEstado = await new Promise((resolve) => {
        leerDatos.question("Introduzca el nuevo estado: ", (estado) => {
          resolve(estado);
        });
      });
      await actualizarTarea(
        parseInt(indicadorActualizar),
        nuevaDescripcion,
        nuevoEstado
      );
      break;
    case "5":
      const indiceEliminar = await new Promise((resolve) => {
        leerDatos.question("Indique qué tarea desea eliminar: ", (indice) => {
          resolve(indice);
        });
      });
      await eliminarTarea(parseInt(indiceEliminar));
      break;
  }
}

mostrarMenu();

module.exports = { listaDeTareas };
