// Import
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Armazenamento do usuário no local storage e mantendo logado
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // Recupera usuário
    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    //API criar uma session
    const loggedUser = response.data.user;
    const token = response.data.token;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);

    setUser(loggedUser);

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  // Function de logout
  const logout = () => {
    // Quando estiver deslogado remove usuário de local storage e volta para a tela de login
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");
  };

  return (
    // Export
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
