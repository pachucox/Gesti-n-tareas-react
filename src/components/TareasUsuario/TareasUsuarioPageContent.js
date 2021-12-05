import React, { useState, useEffect, useContext } from "react";
import TareasUsuarioTable from "./TareasUsuarioTable";
import AuthContext from "../../store/auth-context";
import { getTareasUsuario } from "../../helpers/tareas";

const TareasUsuarioPageContent = () => {
  const authCtx = useContext(AuthContext);
  const [tareasData, setTareasData] = useState([]);

  const setTareas = async () => {
    const res = await getTareasUsuario(authCtx.id);
    setTareasData(res);
  };

  useEffect(() => {
    setTareas();
    // eslint-disable-next-line
  }, [tareasData]);

  return (
    <div className="centerTablaTarea">
      <TareasUsuarioTable setTareas={setTareas} Data={tareasData} />
    </div>
  );
};

export default TareasUsuarioPageContent;
