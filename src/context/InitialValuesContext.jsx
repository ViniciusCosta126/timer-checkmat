import React, { createContext, useContext, useState } from "react";

const InitialValuesContext = createContext();

export const InitialValuesProvider = ({ children }) => {
  const [valorPrep, setValorPrep] = useState("");
  const [valorRound, setValorRound] = useState("");
  const [valorDescanso, setValorDescanso] = useState("");

  const updateValores = (tipo, newValues) => {
    switch (tipo) {
      case "Preparação":
        setValorPrep(newValues);
        break;
      case "Round":
        setValorRound(newValues);
        break;
      case "Descanso":
        setValorDescanso(newValues);
        break;
    }
  };

  return (
    <InitialValuesContext.Provider
      value={{ valorPrep, valorRound, valorDescanso, updateValores }}
    >
      {children}
    </InitialValuesContext.Provider>
  );
};

export const useInitialValues = () => {
  const context = useContext(InitialValuesContext);
  if (!context) {
    throw new Error(
      "useInitialValues must be used within an InitialValuesProvider"
    );
  }
  return context;
};
