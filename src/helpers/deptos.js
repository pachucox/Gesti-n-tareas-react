import swal from "sweetalert";
export const getDeptos = async () => {
  try {
    const res = await fetch("http://localhost:8080/depto/all");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addDepto = async (d) => {
  try {
    await fetch("http://localhost:8080/depto", {
      method: "POST",
      body: JSON.stringify({
        nombre_departamento: d.nombre_departamento,
        cliente_id_cliente: d.cliente_id_cliente,
      }),
      headers: { "Content-Type": "application/json" },
    });
    swal("Departamento agregado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const modDepto = async (d) => {
  try {
    await fetch("http://localhost:8080/depto", {
      method: "PUT",
      body: JSON.stringify({
        id_departamento: d.id_departamento,
        nombre_departamento: d.nombre_departamento,
        cliente_id_cliente: d.cliente_id_cliente,
      }),
      headers: { "Content-Type": "application/json" },
    });
    swal("Departamento modificado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const deleteDepto = async (id) => {
  try {
    await fetch(`http://localhost:8080/depto/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    swal("Departamento eliminado correctamente");
  } catch (err) {
    console.log(err);
  }
};
