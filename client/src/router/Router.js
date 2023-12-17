import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ProtectedRoute from "../services/pageGuard/ProtectedRoute";
import RedirectRoute from "../services/pageGuard/RedirectRoute";
import AddFile from "../components/AddFile/AddFile";
import AddFolder from "../components/AddFolder/AddFolder";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/:folder_id"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/files/add/:folder_id"
          element={
            <ProtectedRoute>
              <AddFile />
            </ProtectedRoute>
          }
        />
          <Route
          path="/folder/add"
          element={
            <ProtectedRoute>
              <AddFolder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <RedirectRoute>
              <Login />
            </RedirectRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectRoute>
              <Register />
            </RedirectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
