import { createContext, useContext, useState } from "react";

// Criamos o contexto de autenticação
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("user"));

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedIn(true); // Atualiza o estado de login
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false); // Atualiza o estado de login
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
