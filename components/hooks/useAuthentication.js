import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeAuth;
  }, []);

  return { user };
}
