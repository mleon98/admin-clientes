import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Clientes from "./components/Clientes";
import Usuarios from "./components/Usuarios"; // Importar Usuarios
import Auditoria from "./components/Auditoria"; // Importar Auditoria
import Clima from "./components/Clima";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/usuarios" element={<Usuarios />} /> {/* Ruta Usuarios */}
        <Route path="/auditoria" element={<Auditoria />} /> {/* Ruta Auditoria */}
        <Route path="/clima" element={<Clima />} />
      </Routes>
    </Router>
  );
};

export default App;
