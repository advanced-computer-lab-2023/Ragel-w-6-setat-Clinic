import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    _id: "6532ccd0dd670c62687ae949",
  });

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
