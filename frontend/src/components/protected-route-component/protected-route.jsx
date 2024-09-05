import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Usa o estado de autenticação do contexto

  if (!isAuthenticated) {
    // Se o usuário não estiver autenticado, redireciona para login
    return <Navigate to="/" replace />;
  }

  // Se o usuário estiver autenticado, renderiza o componente protegido
  return children;
};

export default ProtectedRoute;
