import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchClima, createAuditoria } from "../services/api";

const Clima = () => {
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Obtener el perfil del usuario desde el localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const perfil = user.perfil;

  const handleSearch = async () => {
    try {
      const data = await fetchClima(ciudad);
      setClima(data);
      setError("");

      // Registrar en la auditoría
      await createAuditoria(
        `Usuario ${user.username} consultó el clima de la ciudad ${ciudad}.`
      );
    } catch (err) {
      setError("Error al obtener el clima");
      setClima(null);
    }
  };

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
      <h2 className="text-center">Clima</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {clima && (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">
              {clima.location.name}, {clima.location.country}
            </h5>
            <p>Temperatura: {clima.current.temp_c} °C</p>
            <p>Condición: {clima.current.condition.text}</p>
            <p>Humedad: {clima.current.humidity}%</p>
            <p>
              Viento: {clima.current.wind_kph} kph ({clima.current.wind_dir})
            </p>
          </div>
        </div>
      )}
      <button
        className="btn btn-secondary mt-3"
        onClick={handleBackToDashboard}
      >
        Volver al Dashboard
      </button>
    </div>
  );
};

export default Clima;
