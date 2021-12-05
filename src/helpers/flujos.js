import swal from "sweetalert";
export const getFlujos = async () => {
  try {
    const res = await fetch("http://localhost:8080/flujo/all");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addFlujo = async (flujo) => {
  try {
    await fetch("http://localhost:8080/flujo", {
      method: "POST",
      body: JSON.stringify({
        descripcion_flujo: flujo.descripcion_flujo,
        fecha_inicio: flujo.fecha_inicio,
        fecha_termino: flujo.fecha_termino,
        tipo_flujo: flujo.tipo_flujo,
        departamento_id_departamento: flujo.departamento_id_departamento,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Flujo agregado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const modFlujo = async (flujo) => {
  try {
    await fetch("http://localhost:8080/flujo", {
      method: "PUT",
      body: JSON.stringify({
        id_flujo: flujo.id_flujo,
        descripcion_flujo: flujo.descripcion_flujo,
        fecha_inicio: flujo.fecha_inicio,
        fecha_termino: flujo.fecha_termino,
        tipo_flujo: flujo.tipo_flujo,
        departamento_id_departamento: flujo.departamento_id_departamento,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Flujo modificado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const deleteFlujo = async (id) => {
  try {
    await fetch(`http://localhost:8080/flujo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    swal("Flujo eliminado correctamente");
  } catch (err) {
    console.log(err);
  }
};
