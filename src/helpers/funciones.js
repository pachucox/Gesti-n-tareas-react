import swal from "sweetalert";
export const getFunciones = async () => {
  try {
    const res = await fetch("http://localhost:8080/funcion/all");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addFuncion = async (funcion) => {
  try {
    await fetch("http://localhost:8080/funcion", {
      method: "POST",
      body: JSON.stringify({
        nombre_funcion: funcion.nombre_funcion,
        flujo_id_flujo: funcion.flujo_id_flujo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Funcion agregada correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const modFuncion = async (funcion) => {
  try {
    await fetch("http://localhost:8080/funcion", {
      method: "PUT",
      body: JSON.stringify({
        id_funcion: funcion.id_funcion,
        nombre_funcion: funcion.nombre_funcion,
        flujo_id_flujo: funcion.flujo_id_flujo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Funcion modificada correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const deleteFuncion = async (id) => {
  try {
    await fetch(`http://localhost:8080/funcion/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    swal("Funcion eliminada correctamente");
  } catch (err) {
    console.log(err);
  }
};
