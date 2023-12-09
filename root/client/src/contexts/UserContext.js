import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    _id: "65671310baf3f1f1336f63ff",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
