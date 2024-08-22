/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext(); // is  use to cretae  context provider

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    email: null,
    token: null,
    id: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    //console.log(JSON.parse(storedUser));
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({
      name: null,
      email: null,
      token: null,
      id: null,
    });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
