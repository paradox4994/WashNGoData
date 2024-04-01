import { createContext, useState } from "react";

export const TableContext = createContext({});

export function TableContextProvider({ children }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    tag: "",
    chart: "",
    template: "",
    rows: "",
    columns: ""
  });
  
  return (
    <TableContext.Provider value={{ data, setData }}>
      {children}
    </TableContext.Provider>
  );
}