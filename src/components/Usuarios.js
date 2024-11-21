import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsuarios, createUsuario, updateUsuario, deleteUsuario, createAuditoria } from "../services/api";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    passwordHash: "",
    perfil: "USER",
  });
  const navigate = useNavigate();

  // Obtener el perfil del usuario desde el localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const perfil = currentUser.perfil;

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await fetchUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError("Error al cargar los usuarios");
      }
    };
    loadUsuarios();
  }, []);

  // Manejar redirección al dashboard
  const handleBackToDashboard = () => {
    if (perfil === "ADMIN") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUsuario) {
        await updateUsuario(editingUsuario.idUsuario, formData);
        await createAuditoria(
          `Usuario ${currentUser.username} actualizó el usuario con ID ${editingUsuario.idUsuario}`
        );
        setUsuarios((prev) =>
          prev.map((usuario) =>
            usuario.idUsuario === editingUsuario.idUsuario
              ? { ...usuario, ...formData }
              : usuario
          )
        );
        setSuccess("Usuario actualizado con éxito");
      } else {
        const newUsuario = await createUsuario(formData);
        await createAuditoria(
          `Usuario ${currentUser.username} creó un nuevo usuario con ID ${newUsuario.idUsuario}`
        );
        setUsuarios((prev) => [...prev, newUsuario]);
        setSuccess("Usuario agregado con éxito");
      }
      setFormData({ username: "", passwordHash: "", perfil: "USER" });
      setEditingUsuario(null);
      setError("");
    } catch {
      setError("Error al guardar el usuario");
      setSuccess("");
    }
  };

  // Manejar edición
  const handleEdit = (usuario) => {
    setEditingUsuario(usuario);
    setFormData(usuario);
  };

  // Manejar eliminación
  const handleDelete = async (idUsuario) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUsuario(idUsuario);
        await createAuditoria(
          `Usuario ${currentUser.username} eliminó el usuario con ID ${idUsuario}`
        );
        setUsuarios((prev) => prev.filter((usuario) => usuario.idUsuario !== idUsuario));
        setSuccess("Usuario eliminado con éxito");
        setError("");
      } catch {
        setError("Error al eliminar el usuario");
        setSuccess("");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Gestión de Usuarios</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Formulario para agregar/editar usuarios */}
      {perfil === "ADMIN" && (
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="passwordHash"
              className="form-control"
              value={formData.passwordHash}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Perfil</label>
            <select
              name="perfil"
              className="form-select"
              value={formData.perfil}
              onChange={handleInputChange}
              required
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingUsuario ? "Actualizar Usuario" : "Agregar Usuario"}
          </button>
        </form>
      )}

      {/* Tabla de usuarios */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Usuario</th>
              <th>Perfil</th>
              <th>Fecha de Creación</th>
              {perfil === "ADMIN" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.username}</td>
                <td>{usuario.perfil}</td>
                <td>{new Date(usuario.fechaCreacion).toLocaleString()}</td>
                {perfil === "ADMIN" && (
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(usuario.idUsuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                )}
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

export default Usuarios;
