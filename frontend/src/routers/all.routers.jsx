import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar-component/navbar.component"; // Importa a Navbar
import DbPage from "../pages/dashboard/dashboard.page";
import LoginPage from "../pages/login/login.page";
import SingUpPage from "../pages/register/register.page";

const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DbPage />} />
        <Route path="/register" element={<SingUpPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
