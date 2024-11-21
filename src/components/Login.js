import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, createAuditoria } from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      localStorage.setItem("user", JSON.stringify(user));

      // Registrar en la auditoría
      await createAuditoria(
        `Usuario ${user.username} inició sesión con perfil ${user.perfil}.`
      );

      user.perfil === "ADMIN"
        ? navigate("/admin-dashboard")
        : navigate("/user-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <img
              src="/LogoMM.png"
              alt="Logo Megamedia"
              style={{ width: "150px", height: "auto" }}
            />
          </div>
          <div className="card">
            <div className="card-header text-center">Sistema de Gestion de Clientes - Login</div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Usuario:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;