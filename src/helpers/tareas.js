import swal from "sweetalert";

export const getTareas = async () => {
  try {
    const res = await fetch("http://localhost:8080/tarea/all");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTareasCreador = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:8080/tarea/creadas?id_creador=${id}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTareasUsuario = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:8080/tarea/usuario?id_responsable=${id}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addTarea = async (tarea) => {
  try {
    await fetch("http://localhost:8080/tarea", {
      method: "POST",
      body: JSON.stringify({
        descripcion_tarea: tarea.descripcion_tarea,
        fecha_inicio: tarea.fecha_inicio,
        fecha_limite: tarea.fecha_limite,
        fecha_termino: tarea.fecha_termino,
        id_creador: tarea.id_creador,
        id_responsable: tarea.id_responsable,
        funcion_id_funcion: tarea.funcion_id_funcion,
        id_tareapadre: tarea.id_tareapadre,
        tarea_id_tarea: tarea.tarea_id_tarea,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Tarea agregada correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const modTarea = async (tarea) => {
  try {
    await fetch("http://localhost:8080/tarea", {
      method: "PUT",
      body: JSON.stringify({
        id_tarea: tarea.id_tarea,
        descripcion_tarea: tarea.descripcion_tarea,
        fecha_inicio: tarea.fecha_inicio,
        fecha_limite: tarea.fecha_limite,
        fecha_termino: tarea.fecha_termino,
        id_creador: tarea.id_creador,
        id_responsable: tarea.id_responsable,
        funcion_id_funcion: tarea.funcion_id_funcion,
        id_tareapadre: tarea.id_tareapadre,
        tarea_id_tarea: tarea.tarea_id_tarea,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Tarea modificada correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const deleteTarea = async (id) => {
  try {
    await fetch(`http://localhost:8080/tarea/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    swal("Tarea eliminada correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const calcDif = (fechaLimite) => {
  return (Date.parse(fechaLimite) - new Date()) / (1000 * 3600 * 24);
};
export const calcProgresoTarea = (fechaI, fechaL) => {
  const cien = Date.parse(fechaL) - Date.parse(fechaI);
  const current = new Date() - Date.parse(fechaI);
  const porcentaje = (100 * current) / cien;
  if (porcentaje < 100) return Math.trunc(porcentaje);
  if (porcentaje > 100) return 100;
};
