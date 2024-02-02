"use strict";
let registroTareas = [];

const listaTareas = document.getElementById("lista");
const totalTareas = document.getElementById("info__total");
const completasTareas = document.getElementById("info__completa");
const incompletasTareas = document.getElementById("info__incompleta");

function mostrarTareas() {
  listaTareas.innerHTML = "";

  if (registroTareas.length > 0) {
    registroTareas.forEach((iTarea) => {
      const cajaDiv = document.createElement("div");
      cajaDiv.classList.add("contenido__lista__item");

      cajaDiv.innerHTML = `
          <p ${iTarea.estado ? 'class="lista__item--completado"' : ""}>${
        iTarea.tarea
      }</p>
          <div class="lista__item__botones">
            <button class="item__botones__accion" onclick="accionTarea(${
              iTarea.id
            })">${iTarea.estado ? "&#9745" : "&#9744"}</button>
            <button class="item__botones__eliminar" onclick="eliminarTarea(${
              iTarea.id
            })">&#9932</button>
          </div>
        `;

      listaTareas.appendChild(cajaDiv);
    });
  } else {
    const etiquetaP = document.createElement("p");
    etiquetaP.classList.add("contenido__lista__vacio");
    etiquetaP.textContent = "No hay tareas";
    listaTareas.appendChild(etiquetaP);
  }

  let tareasTotal = registroTareas.length;
  let tareasCompletas = registroTareas.filter(
    (iTarea) => iTarea.estado === true
  ).length;

  totalTareas.innerHTML = `${tareasTotal} <br /> Tareas `;
  completasTareas.innerHTML = `${tareasCompletas} <br /> Completas`;
  incompletasTareas.innerHTML = `${
    tareasTotal - tareasCompletas
  }  <br /> Incompletas`;
}

document.addEventListener("DOMContentLoaded", () => {
  registroTareas = JSON.parse(localStorage.getItem("lista-tareas")) || [];
  mostrarTareas();
});

const formularioTareas = document.getElementById("formulario");
formularioTareas.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevaTarea = document.getElementById("nuevo-item").value;

  if (nuevaTarea.trim().length > 0) {
    const tarea = { id: Date.now(), tarea: nuevaTarea, estado: false };
    registroTareas = [...registroTareas, tarea];
    localStorage.setItem("lista-tareas", JSON.stringify(registroTareas));
    formularioTareas.reset();
    mostrarTareas();
  }
});

function eliminarTarea(tareaID) {
  const nuevaLista = registroTareas.filter((tarea) => tarea.id !== tareaID);
  registroTareas = nuevaLista;
  localStorage.setItem("lista-tareas", JSON.stringify(registroTareas));
  mostrarTareas();
}

function accionTarea(tareaID) {
  const nuevaLista = registroTareas.map((tarea) => {
    if (tarea.id === tareaID) tarea.estado = !tarea.estado;
    return tarea;
  });
  registroTareas = nuevaLista;
  localStorage.setItem("lista-tareas", JSON.stringify(registroTareas));
  mostrarTareas();
}