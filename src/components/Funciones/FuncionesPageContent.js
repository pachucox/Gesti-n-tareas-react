import React, { useState, useEffect } from "react";
import FuncionesTable from "./FuncionesTable";
import { getFunciones } from "../../helpers/funciones";
import { getFlujos } from "../../helpers/flujos";

const FuncionesPageContent = () => {
  const [funcionesData, setFuncionesData] = useState([]);
  const [flujosData, setFlujoData] = useState([]);

  const setFunciones = async () => {
    const res = await getFunciones();
    setFuncionesData(res);
  };
  const setFlujos = async () => {
    const res = await getFlujos();
    setFlujoData(res);
  };

  useEffect(() => {
    setFunciones();
    setFlujos();
  }, [funcionesData]);

  return (
    <div className="centerTabla">
      <FuncionesTable
        Data={funcionesData}
        flujosData={flujosData}
        setFunciones={setFunciones}
      />
    </div>
  );
};

export default FuncionesPageContent;
