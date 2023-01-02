import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const tempDoc = [];
    const unregisterAUthobserver = getAuth().onAuthStateChanged(
      async (user) => {
        const snapshot = await getDocs(collection(db, "accounts"));
        snapshot.forEach((doc) => {
          tempDoc.push({ ...doc.data() });
        });
        if (user)
          setCurrentUser({
            ...user,
            pending: false,
            isSignedIn: !!user,
            accounts: tempDoc,
          });
      }
    );

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
