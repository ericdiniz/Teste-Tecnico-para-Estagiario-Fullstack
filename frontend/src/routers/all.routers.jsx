import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login/login.page";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<SingUpPage />} /> */}
      </Routes>
    </div>
  );
};

export default AllRoutes;
