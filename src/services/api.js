import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api",
});

// Usuarios
export const fetchUsuarios = async () => {
  const { data } = await API.get("/usuarios");
  return data;
};

export const createUsuario = async (usuario) => {
  const { data } = await API.post("/usuarios", usuario);
  return data;
};

export const updateUsuario = async (idUsuario, usuario) => {
  const { data } = await API.put(`/usuarios/${idUsuario}`, usuario);
  return data;
};

export const deleteUsuario = async (idUsuario) => {
  await API.delete(`/usuarios/${idUsuario}`);
};

// Clientes
export const fetchClientes = async () => {
  const { data } = await API.get("/clientes");
  return data;
};

export const createCliente = async (cliente) => {
  const { data } = await API.post("/clientes", cliente);
  return data;
};

export const updateCliente = async (idCliente, cliente) => {
  const { data } = await API.put(`/clientes/${idCliente}`, cliente);
  return data;
};

export const deleteCliente = async (idCliente) => {
  await API.delete(`/clientes/${idCliente}`);
};

// Auditoria
export const fetchAuditoria = async () => {
  const { data } = await API.get("/auditoria");
  return data;
};

// Clima
export const fetchClima = async (ciudad) => {
  const { data } = await API.get(`/clima/${ciudad}`);
  return data;
};

// Login
export const login = async (username, password) => {
  const { data } = await API.get("/usuarios");
  const user = data.find(
    (user) => user.username === username && user.passwordHash === password
  );
  if (!user) throw new Error("Usuario o contraseña incorrectos");
  return user;
};

// Registrar una entrada de auditoría
export const createAuditoria = async (accion) => {
  const { data } = await API.post("/auditoria", {
    idUsuario: JSON.parse(localStorage.getItem("user")).idUsuario,
    accion,
  });
  return data;
};

export default API;
