import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./contexts/auth";

// Imports das Paginas
import Home from "./pages/Home/Home";
import Arquivos from "./pages/Arquivos/Arquivos";
import Login from "./pages/Login/Login";
import EditUser from "./pages/EditUser/[id]";
import Prontuarios from "./pages/Prontuarios/Prontuarios";
import UsersList from "./pages/UsersList/UsersList";
import VizualizarDoc from "./pages/VizualizarDocs/VizualizarDoc";
import DocumentA from "./pages/DocumentA/DocumentA";
const AppRoutes = () => {
  // Private pages
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    // Se estiver no login, mostra carregando
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }
    // Se não tiver authenticado não sai da dela de login
    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    // React router dom
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            exact
            path="/arquivos"
            element={
              <Private>
                <Arquivos />
              </Private>
            }
          />
          <Route
            exact
            path="/editar-usuario/:id"
            element={
              <Private>
                <EditUser />
              </Private>
            }
          />
          <Route
            exact
            path="/users-list"
            element={
              <Private>
                <UsersList />
              </Private>
            }
          />
          <Route
            exact
            path="/prontuarios"
            element={
              <Private>
                <Prontuarios />
              </Private>
            }
          />

          <Route
            exact
            path="/documentA"
            element={
              <Private>
                <DocumentA />
              </Private>
            }
          />

          <Route
            exact
            path="/vizualizar-documento/:id"
            element={
              <Private>
                <VizualizarDoc />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
