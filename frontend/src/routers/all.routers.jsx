import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/protected-route-component/protected-route";
import DbPage from "../pages/dashboard/dashboard.page";
import LoginPage from "../pages/login/login.page";
import SingUpPage from "../pages/register/register.page";

const AllRoutes = () => {
  return (
    <Routes>
      {/* A página de login e registro são acessíveis sem autenticação */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<SingUpPage />} />

      {/* Dashboard está protegido, só acessível após o login */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DbPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
