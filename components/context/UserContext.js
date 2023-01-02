import React, { createContext, useState } from "react";
export default UserContext = createContext();

/*export const UserProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const setUser = (newUser) => {
    setCurrentUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user: currentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}; */

//export { UserContext, UserProvider };
