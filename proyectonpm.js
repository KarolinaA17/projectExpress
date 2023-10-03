const readline = require("readline");
const leerDatos = readline.createInterface([
  {
    input: process.stadin,
    out: process.stdout,
  },
]);

const listaDeTareas = [
  {
    indicador: 1,
    Descripcion: "Hacer aseo",
    Estado: "Completado",
  },
  {
    indicador: 2,
    Descripcion: "Ir al supermercado",
    Estado: "Completado",
  },
  {
    indicador: 3,
    Descripcion: "Organizar mercado",
    Estado: " Completado",
  },
  {
    indicador: 4,
    Descripcion: "Hacer el almuerzo",
    Estado: "Incompleto",
  },
  {
    indicador: 5,
    Descripcion: "Sacar los perros al parque",
    Estado: "Incompleto",
  },
];

function añadirTarea(indicador, Descripcion, Estado) {
  const nuevaTarea = {
    indicador: indicador,
    Descripcion: Descripcion,
    Estado: Estado,
  };
  listaDeTareas.push(nuevaTarea);
  console.log(`tarea" ${(indicador, Descripcion, Estado)} "agregado.`);
}

function borrarTarea(indicador, Descripcion, Estado) {
  const eliminartarea = {
    indicador: indicador,
    Descripcion: Descripcion,
    Estado: Descripcion,
  };
  if (eliminartarea !== -1) {
    listaDeTareas.splice(eliminartarea, 1);
    console.log(`tarea " ${Descripcion}"eliminado.`);
  } else {
    console.log(
      `El tarea "${
        (indicador, Descripcion, Estado)
      }" no se encontro en la lista`
    );
  }
}

function imprimirlistaDeTareas() {
  console.log("LISTA DE tareaS:");
  for (const tarea of listaDeTareas) {
    console.log(tarea);
  }
}

function actualizarTarea(nuevoIndicador, nuevoDescripcion, nuevoEstado) {
  const tarea = listaDeTareas.find((tarea) => tarea.indicador === indicador);
  if (tarea) {
    tarea.Descripcion = nuevoDescripcion;
    tarea.Estado = nuevoEstado;
    console.log(
      `Tarea actualizada: ${tarea.Descripcion}, ${tarea.Estado},${tarea.Numero}`
    );
  } else {
    console.log("La tarea no se encontró en la lista de Tareas.");
  }
}

añadirTarea(6, "Hacer Ejercicio", "Incompleta");
imprimirlistaDeTareas();

borrarTarea(1, "Hacer aseo", "Completado");
imprimirlistaDeTareas();
actualizarTarea(4, "Hacer almuerzo", "Completo");
console.log(listaDeTareas);

imprimirlistaDeTareas();
