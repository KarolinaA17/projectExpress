const fs = require("fs");
const readline = require("readline");

const leerDatos = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let listaDeTareas = [
  {
    indicador: 1,
    descripcion: "Hacer  aseo a la casa",
    estado: "Completado",
  },
  {
    indicador: 2,
    descripcion: "Ir al supermercado",
    estado: "Completado",
  },
  {
    indicador: 3,
    descripcion: "Organizar mercado",
    estado: " Completado",
  },
  {
    indicador: 4,
    descripcion: "Hacer el almuerzo",
    estado: "Incompleto",
  },
  {
    indicador: 5,
    descripcion: "Sacar los perros al parque",
    estado: "Incompleto",
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
  const nuevaTarea = {
    indicador: indicador,
    descripcion: descripcion,
    estado: estado,
  };
  listaDeTareas.push(nuevaTarea);
  console.log(`tarea" ${(indicador, descripcion, estado)} "agregado.`);
  mostrarMenu();
}

function marcarComoCompletada(indice, tareas) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice - 1].estado = "completado";
    console.log(`Tarea "${listaDeTareas[indice].descripcion}" completada.`);
  } else {
    console.log("Índice de tarea no válido.");
  }
  mostrarMenu();
}

function actualizarTarea(indicador, nuevaDescripcion, nuevoEstado) {
  const tarea = listaDeTareas.find((tarea) => tarea.indicador === indicador);
  if (tarea) {
    tarea.descripcion = nuevaDescripcion;
    tarea.estado = nuevoEstado;
    console.log(`Tarea actualizada: ${nuevaDescripcion}, ${nuevoEstado}`);
  } else {
    console.log(`Tarea no encontrada en la lista`);
  }
  mostrarMenu();
}

function eliminarTarea(indice) {
  if (indice >= 0 && indice < listaDeTareas.length) {
    const tareaEliminada = listaDeTareas.splice(indice, 1);
    console.log("Tarea eliminada con éxito:", tareaEliminada[0].descripcion);
  } else {
    console.log("Índice fuera de rango. La tarea no se pudo eliminar.");
  }
  mostrarMenu();
}

function mostrarMenu() {
  console.log(menu());
  leerDatos.question("Ingrese la opción deseada:", (opcion) => {
    switch (opcion) {
      case "1":
        imprimirlistaDeTareas(listaDeTareas);
        break;
      case "2":
        leerDatos.question("Introduca la indicador", (indicador) => {
          leerDatos.question("Introducir descripcion", (descripcion) => {
            leerDatos.question("Introducir estado", (estado) => {
              añadirTarea(indicador, descripcion, estado);
            });
          });
        });
        break;
      case "3":
        leerDatos.question(
          "Escribe el indice de la tarea para marcarcarla como completada",
          (indicador) => {
            marcarComoCompletada(indicador, listaDeTareas);
          }
        );
        break;
      case "4":
        leerDatos.question("Introduca la indicador", (indicador) => {
          leerDatos.question(
            "Introducir la nueva descripcion",
            (nuevaDescripcion) => {
              leerDatos.question("Introducir estado", (nuevoEstado) => {
                actualizarTarea(
                  parseInt(indicador),
                  nuevaDescripcion,
                  nuevoEstado
                );
              });
            }
          );
        });
        break;
      case "5":
        leerDatos.question("Indica que tarea deseas eliminar", (indicador) => {
          eliminarTarea(parseInt(indicador));
        });
    }
  });
}
mostrarMenu();
