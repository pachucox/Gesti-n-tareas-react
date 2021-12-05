import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import { getUsers } from "../../helpers/usuarios";
import { getClientes } from "../../helpers/clientes";
import { getPerfiles } from "../../helpers/perfiles";

const UsersPageContent = () => {
  const [data, setData] = useState([]);
  const [clientesData, setClientesData] = useState([]);
  const [perfilesData, setPerfilesData] = useState([]);

  const setUsuarios = async () => {
    const res = await getUsers();
    setData(res);
  };
  const setClientes = async () => {
    const res = await getClientes();
    setClientesData(res);
  };

  const setPerfiles = async () => {
    const res = await getPerfiles();
    setPerfilesData(res);
  };

  useEffect(() => {
    setUsuarios();
    setPerfiles();
    setClientes();
  }, [data]);

  return (
    <div className="centerTabla">
      <UsersTable
        Data={data}
        clientes={clientesData}
        perfiles={perfilesData}
        setUsuarios={setUsuarios}
      />
    </div>
  );
};

export default UsersPageContent;
