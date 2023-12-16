import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
              <Home />
          }
        />
        <Route
          path="/"
          element={
              <Login />
          }
        />
        <Route
          path="/register"
          element={
              <Register />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
