import emailjs from "emailjs-com";
import swal from "sweetalert";

export const addJustificacion = async (j) => {
  try {
    await fetch("http://localhost:8080/justificacion", {
      method: "POST",
      body: JSON.stringify({
        descripcion_justificacion: j.descripcion_justificacion,
        tarea_id_tarea: j.tarea_id_tarea,
      }),
      headers: { "Content-Type": "application/json" },
    });
    swal("Justificación enviada correctamente");
  } catch (err) {
    console.log(err);
  }
};

export const getEmailCreador = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:8080/justificacion/creador/${id}`
    );
    const data = await res.text();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const enviarMail = (id, to, msg, user, userId) =>
  emailjs
    .send(
      "SERVICE_ID,
      "TEMPLATE_NAME",
      {
        id_tarea: id,
        to_email: to,
        message: msg,
        nombre_usuario: user,
        id_usuario: userId,
      },
      "USER_ID"
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("ERROR!", err);
      }
    );
