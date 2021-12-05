import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import TareasTable from "./TareasTable";
import { getTareas, getTareasCreador } from "../../helpers/tareas";
import { getFunciones } from "../../helpers/funciones";
import { getUsers } from "../../helpers/usuarios";

const TareasPageContent = () => {
  const authCtx = useContext(AuthContext);
  const [tareasData, setTareasData] = useState([]);
  const [usuariosData, setUsuariosData] = useState([]);
  const [funcionesData, setFuncionesData] = useState([]);

  const setTareas = async () => {
    if (authCtx.prioridad === 1) {
      const res = await getTareas();
      setTareasData(res);
    } else {
      const res = await getTareasCreador(authCtx.id);
      setTareasData(res);
    }
  };
  const setUsuarios = async () => {
    const res = await getUsers();
    setUsuariosData(res);
  };
  const setFunciones = async () => {
    const res = await getFunciones();
    setFuncionesData(res);
  };

  useEffect(() => {
    setTareas();
    setUsuarios();
    setFunciones();
  }, [tareasData]);

  return (
    <div className="centerTablaTarea">
      <TareasTable
        setTareas={setTareas}
        Data={tareasData}
        usuarios={usuariosData}
        funciones={funcionesData}
      />
    </div>
  );
};

export default TareasPageContent;
