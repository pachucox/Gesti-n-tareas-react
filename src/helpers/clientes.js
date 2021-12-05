import swal from "sweetalert";
/* eslint-disable eqeqeq */

export const getClientes = async () => {
  try {
    const res = await fetch("http://localhost:8080/cliente/all");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addCliente = async (c) => {
  try {
    await fetch("http://localhost:8080/cliente", {
      method: "POST",
      body: JSON.stringify({
        rut_cliente: c.rut_cliente,
        nombre_cliente: c.nombre_cliente,
      }),
      headers: { "Content-Type": "application/json" },
    });
    swal("Cliente agregado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const modCliente = async (c) => {
  try {
    await fetch("http://localhost:8080/cliente", {
      method: "PUT",
      body: JSON.stringify({
        id_cliente: c.id_cliente,
        rut_cliente: c.rut_cliente,
        nombre_cliente: c.nombre_cliente,
      }),
      headers: { "Content-Type": "application/json" },
    });
    swal("Cliente modificado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const deleteCliente = async (id) => {
  try {
    await fetch(`http://localhost:8080/cliente/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    swal("Cliente eliminado");
  } catch (err) {
    console.log(err);
  }
};

export const Fn = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
    var tmp = rutCompleto.split("-");
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == "K") digv = "k";
    return Fn.dv(rut) == digv;
  },
  dv: function (T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  },
};
