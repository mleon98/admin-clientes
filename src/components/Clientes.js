import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  createAuditoria,
} from "../services/api";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });
  const navigate = useNavigate();

  // Obtener el perfil del usuario desde el localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const perfil = user.perfil;

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const data = await fetchClientes();
        setClientes(data);
      } catch (err) {
        setError("Error al cargar los clientes");
      }
    };
    loadClientes();
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
      if (editingCliente) {
        await updateCliente(editingCliente.idCliente, formData);
        setClientes((prev) =>
          prev.map((cliente) =>
            cliente.idCliente === editingCliente.idCliente ? { ...cliente, ...formData } : cliente
          )
        );
        setSuccess("Cliente actualizado con éxito");
        await createAuditoria(
          `Usuario ${user.username} actualizó el cliente con ID ${editingCliente.idCliente}.`
        );
      } else {
        const newCliente = await createCliente(formData);
        setClientes((prev) => [...prev, newCliente]);
        setSuccess("Cliente agregado con éxito");
        await createAuditoria(
          `Usuario ${user.username} creó el cliente con nombre ${newCliente.nombre}.`
        );
      }
      setFormData({ nombre: "", email: "", telefono: "", direccion: "" });
      setEditingCliente(null);
      setError("");
    } catch {
      setError("Error al guardar el cliente");
      setSuccess("");
    }
  };

  // Manejar edición
  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData(cliente);
  };

  // Manejar eliminación
  const handleDelete = async (idCliente) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await deleteCliente(idCliente);
        setClientes((prev) => prev.filter((cliente) => cliente.idCliente !== idCliente));
        setSuccess("Cliente eliminado con éxito");
        setError("");
        await createAuditoria(
          `Usuario ${user.username} eliminó el cliente con ID ${idCliente}.`
        );
      } catch {
        setError("Error al eliminar el cliente");
        setSuccess("");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Gestión de Clientes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Formulario para agregar/editar clientes */}
      {perfil === "ADMIN" && (
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              className="form-control"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingCliente ? "Actualizar Cliente" : "Agregar Cliente"}
          </button>
        </form>
      )}

      {/* Tabla de clientes */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Fecha de Registro</th>
              {perfil === "ADMIN" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.idCliente}>
                <td>{cliente.idCliente}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{new Date(cliente.fechaRegistro).toLocaleString()}</td>
                {perfil === "ADMIN" && (
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(cliente.idCliente)}
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

export default Clientes;
