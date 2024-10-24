import React, { createContext, useState } from "react";

// Crear el contexto
export const GlobalContext = createContext();

// Crear un proveedor de contexto
const GlobalProvider = ({ children }) => {
  const [logUser, setLogUser] = useState(null); // Ejemplo de una variable en el estado global

  return (
    <GlobalContext.Provider value={{ logUser, setLogUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
