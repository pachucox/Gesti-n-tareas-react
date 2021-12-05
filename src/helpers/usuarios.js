import swal from "sweetalert";
export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:8080/usuario/all");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addUser = async (user) => {
  try {
    await fetch("http://localhost:8080/usuario", {
      method: "POST",
      body: JSON.stringify({
        nombre_usuario: user.nombre_usuario,
        email_usuario: user.email_usuario,
        pass_usuario: user.pass_usuario,
        perfil_id_perfil: user.perfil_id_perfil,
        cliente_id_cliente: user.cliente_id_cliente,
      }),
      headers: { "Content-Type": "application/json" },
    });
    swal("Usuario agregado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const modUser = async (user) => {
  try {
    await fetch("http://localhost:8080/usuario", {
      method: "PUT",
      body: JSON.stringify({
        id_usuario: user.id_usuario,
        nombre_usuario: user.nombre_usuario,
        email_usuario: user.email_usuario,
        pass_usuario: user.pass_usuario,
        perfil_id_perfil: user.perfil_id_perfil,
        cliente_id_cliente: user.cliente_id_cliente,
      }),
      headers: { "Content-Type": "application/json" },
    });
    swal("Usuario modificado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id) => {
  try {
    await fetch(`http://localhost:8080/usuario/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    swal("Usuario borrado.");
  } catch (err) {
    console.log(err);
  }
};
