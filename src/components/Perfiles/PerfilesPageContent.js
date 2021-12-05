import React, { useEffect, useState } from "react";
import PerfilesTable from "./PerfilesTable";
import { getPerfiles } from "../../helpers/perfiles";

const PerfilesPageContent = () => {
  const [perfilesData, setPerfilesData] = useState([]);

  const setPerfiles = async () => {
    const res = await getPerfiles();
    setPerfilesData(res);
  };

  useEffect(() => {
    setPerfiles();
  }, [perfilesData]);

  return (
    <div className="centerTabla">
      <PerfilesTable Data={perfilesData} setPerfiles={setPerfiles} />
    </div>
  );
};

export default PerfilesPageContent;
