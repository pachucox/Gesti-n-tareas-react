import React, { useState, useEffect } from "react";
import ClientsTable from "./ClientsTable";
import { getClientes } from "../../helpers/clientes";

const ClientsPageContent = () => {
  const [clientesData, setClientesData] = useState([]);

  const setClientes = async () => {
    const res = await getClientes();
    setClientesData(res);
  };

  useEffect(() => {
    setClientes();
  }, [clientesData]);

  return (
    <div className="centerTabla">
      <ClientsTable Data={clientesData} setClientes={setClientes} />
    </div>
  );
};

export default ClientsPageContent;
