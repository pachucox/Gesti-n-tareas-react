import React, { useState, useEffect } from "react";
import { getFlujos } from "../../helpers/flujos";
import { getDeptos } from "../../helpers/deptos";
import FlujosTable from "./FlujosTable";

const FlujosPageContent = () => {
  const [flujosData, setFlujosData] = useState([]);
  const [deptosData, setDeptosData] = useState([]);

  const setFlujos = async () => {
    const res = await getFlujos();
    setFlujosData(res);
  };

  const setDeptos = async () => {
    const res = await getDeptos();
    setDeptosData(res);
  };

  useEffect(() => {
    setFlujos();
    setDeptos();
  }, [flujosData]);

  return (
    <div className="centerTabla">
      <FlujosTable
        Data={flujosData}
        deptosData={deptosData}
        setFlujos={setFlujos}
      />
    </div>
  );
};

export default FlujosPageContent;
