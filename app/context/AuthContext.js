import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(

useEffect( () => {
   const user = localStorage.getItem("user");
    if (user) {
      setAuthUser(JSON.parse(user));
    }
},[])
    // JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};