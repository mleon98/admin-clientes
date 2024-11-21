import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Manejar el Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Eliminar el usuario del localStorage
    navigate("/", { replace: true }); // Redirigir al formulario de login y reemplazar el historial
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <img
            src="/LogoMM.png"
            alt="Logo Megamedia"
            className="mb-3"
            style={{ width: "100px", height: "auto" }}
          />
          <h2>Gestión de Clientes - Megamedia</h2>
        </div>
        <div className="card-body">
          <div className="list-group mb-4">
            <Link to="/clientes" className="list-group-item list-group-item-action">
              <i className="bi bi-person-fill"></i> Clientes
            </Link>
            <Link to="/usuarios" className="list-group-item list-group-item-action">
              <i className="bi bi-people-fill"></i> Usuarios
            </Link>
            <Link to="/auditoria" className="list-group-item list-group-item-action">
              <i className="bi bi-file-earmark-text"></i> Auditoría
            </Link>
            <Link to="/clima" className="list-group-item list-group-item-action">
              <i className="bi bi-cloud-sun"></i> Clima
            </Link>
          </div>
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
