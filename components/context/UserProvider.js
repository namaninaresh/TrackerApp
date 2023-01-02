import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unregisterAUthobserver = getAuth().onAuthStateChanged((user) => {
      if (user) setCurrentUser({ ...user, pending: false, isSignedIn: !!user });
    });

    return () => unregisterAUthobserver();
  }, []);
  const setUser = (newUser) => {
    setCurrentUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user: currentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
