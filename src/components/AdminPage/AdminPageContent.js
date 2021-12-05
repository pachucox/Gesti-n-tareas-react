import React from "react";

const AdminPageContent = () => {
  const getUsuariosHandler = async () => {
    const res = await fetch("http://localhost:8080/usuario/all");
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div>Página Admin</div>
      <button onClick={getUsuariosHandler}>Obtener usuarios</button>
    </>
  );
};

export default AdminPageContent;
