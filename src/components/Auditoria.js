import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuditoria } from "../services/api";

const Auditoria = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Obtener el perfil del usuario desde el localStorage
  const perfil = JSON.parse(localStorage.getItem("user")).perfil;

  useEffect(() => {
    const loadAuditorias = async () => {
      try {
        const data = await fetchAuditoria();
        setAuditorias(data);
      } catch (err) {
        setError("Error al cargar los registros de auditoría");
      }
    };
    loadAuditorias();
  }, []);

  // Manejar redirección al dashboard
  const handleBackToDashboard = () => {
    if (perfil === "ADMIN") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Registros de Auditoría</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Usuario</th>
              <th>Acción</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {auditorias.map((auditoria) => (
              <tr key={auditoria.idAuditoria}>
                <td>{auditoria.idAuditoria}</td>
                <td>{auditoria.idUsuario}</td>
                <td>{auditoria.accion}</td>
                <td>{new Date(auditoria.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-secondary mt-3"
        onClick={handleBackToDashboard}
      >
        Volver al Dashboard
      </button>
    </div>
  );
};

export default Auditoria;
