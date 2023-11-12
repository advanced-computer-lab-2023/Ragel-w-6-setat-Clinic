import React, { createContext, useState } from "react";

export const HealthPackagesContext = createContext();

const HealthPackagesContextProvider = (props) => {
  const [healthPackages, setHealthPackages] = useState(null);
  return (
    <HealthPackagesContext.Provider
      value={{ healthPackages, setHealthPackages }}
    >
      {props.children}
    </HealthPackagesContext.Provider>
  );
};

export default HealthPackagesContextProvider;
