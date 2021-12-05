import React, { useState } from "react";

const AuthContext = React.createContext({
  prioridad: 0,
  nombre: "",
  id: 0,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveNombre = () => {
  const storedNombre = localStorage.getItem("nombre");
  return { nombre: storedNombre };
};
const retrievePrioridad = () => {
  const storedPrio = localStorage.getItem("prio");
  return { prioridad: storedPrio };
};
const retrieveId = () => {
  const storedId = localStorage.getItem("id");
  return { id: storedId };
};

export const AuthContextProvider = (props) => {
  const idData = retrieveId();
  const nombreData = retrieveNombre();
  const prioData = retrievePrioridad();
  let initialNombre;
  let initialPrio;
  let initialId;
  if (nombreData) {
    initialNombre = nombreData.nombre;
  }
  if (prioData) {
    initialPrio = +prioData.prioridad;
  }
  if (idData) {
    initialId = +idData.id;
  }

  const [id, setId] = useState(initialId);
  const [prioridad, setPrioridad] = useState(+initialPrio);
  const [nombre, setNombre] = useState(initialNombre);
  const userIsLoggedIn = !!nombre;

  const logoutHandler = () => {
    setId(0);
    setPrioridad(0);
    setNombre("");

    localStorage.removeItem("nombre");
    localStorage.removeItem("prio");
    localStorage.removeItem("id");
  };

  const loginHandler = (prioridad, nombre, id) => {
    setId(id);
    setPrioridad(prioridad);
    setNombre(nombre);
    localStorage.setItem("id", +id);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("prio", +prioridad);
  };

  const contextValue = {
    id,
    prioridad,
    nombre,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
