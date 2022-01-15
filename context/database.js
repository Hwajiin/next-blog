import { createContext, useContext } from "react";
import Database from "../service/database";

const DatabaseContext = createContext({});

export const DatabaseProvider = ({ children }) => {
  const database = new Database();

  return (
    <DatabaseContext.Provider value={{ database }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDB = () => useContext(DatabaseContext);
