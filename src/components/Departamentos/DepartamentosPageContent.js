import React, { useState, useEffect } from "react";
import DepartamentosTable from "./DepartamentosTable";
import { getDeptos } from "../../helpers/deptos";
import { getClientes } from "../../helpers/clientes";

const DepartamentosPageContent = () => {
  const [deptosData, setDeptosData] = useState([]);
  const [clientesData, setClientesData] = useState([]);

  const setDeptos = async () => {
    const res = await getDeptos();
    setDeptosData(res);
  };

  const setClientes = async () => {
    const res = await getClientes();
    setClientesData(res);
  };

  useEffect(() => {
    setDeptos();
    setClientes();
  }, [deptosData]);

  return (
    <div className="centerTabla">
      <DepartamentosTable
        Data={deptosData}
        clientes={clientesData}
        setDeptos={setDeptos}
      />
    </div>
  );
};

export default DepartamentosPageContent;
