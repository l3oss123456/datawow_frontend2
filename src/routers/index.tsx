import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../views/Login";
import LoginGuardRoute from "./LoginGuardRoute";
import PrivateGuardRoute from "./PrivateGuardRoute";
import { listRoute } from "../utils/funcs/routes.func";

const Router: React.FC = () => {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/login");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginGuardRoute />}>
          <Route index element={<LoginPage />} />
        </Route>

        {listRoute("publicRoute")}

        <Route path="/" element={<PrivateGuardRoute />}>
          {listRoute("privateRoute")}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
