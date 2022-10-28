import { createContext, useEffect, useState } from "react";
import firebaseApp from "../firebase/firebase.config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const userContext = createContext(null);
export { userContext };

export default function AuthContext({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  //------------------------------
  useEffect(() => {
    const persist = onAuthStateChanged(auth, (user) => {
      setActiveUser(user);
      setAuthLoading(false);
    });

    return () => persist();
  }, []);

  // Auth Handling functions
  const loginHandler = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerHandler = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOutHandler = () => {
    return signOut(auth);
  };
  //------------------------------

  // PayLoad
  const contextPayLoad = {
    loginHandler,
    registerHandler,
    authLoading,
    activeUser,
    setActiveUser,
    logOutHandler,
  };
  //------------------------------
  return (
    <userContext.Provider value={contextPayLoad}>
      {children}
    </userContext.Provider>
  );
}
