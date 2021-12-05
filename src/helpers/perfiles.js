import swal from "sweetalert";
export const getPerfiles = async () => {
  try {
    const res = await fetch("http://localhost:8080/perfil/all");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addPerfil = async (perfil) => {
  try {
    await fetch("http://localhost:8080/perfil", {
      method: "POST",
      body: JSON.stringify({
        nombre_perfil: perfil.nombre_perfil,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Perfil agregado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const modPerfil = async (perfil) => {
  try {
    await fetch("http://localhost:8080/perfil", {
      method: "PUT",
      body: JSON.stringify({
        id_perfil: perfil.id_perfil,
        nombre_perfil: perfil.nombre_perfil,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    swal("Perfil modificado correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const deletePerfil = async (id) => {
  try {
    await fetch(`http://localhost:8080/perfil/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    swal("Perfil eliminado correctamente");
  } catch (err) {
    console.log(err);
  }
};
