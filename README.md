# Aplicación Front End: Sistema de Gestión de Clientes

El front end de esta aplicación está desarrollado con **React.js** y utiliza las siguientes tecnologías:

- **React Router**: Para el manejo de rutas.
- **Bootstrap 5**: Para estilos y diseño responsivo.
- **Axios**: Para realizar peticiones a la API.
- **Context API**: Para manejar el estado global de la aplicación.

## Características Principales

1. **Inicio de Sesión (Login)**  
   - Los usuarios pueden iniciar sesión ingresando su nombre de usuario y contraseña.
   - La autenticación verifica los datos ingresados con la base de datos a través de la API.
   - Según el rol del usuario (`ADMIN` o `USER`), se redirige a un dashboard específico.

2. **Dashboard del Administrador**  
   - Acceso solo para usuarios con rol `ADMIN`.
   - Incluye las siguientes funcionalidades:
     - Gestión de Clientes: CRUD completo.
     - Gestión de Usuarios: CRUD completo.
     - Auditoría: Registro de las actividades realizadas en la aplicación.
     - Clima: Consulta de información climática.

3. **Dashboard del Usuario**  
   - Acceso limitado para usuarios con rol `USER`.
   - Funcionalidades:
     - Gestión de Clientes: Solo consulta (sin edición ni eliminación).
     - Clima: Consulta de información climática.

4. **Gestión de Clientes**  
   - Listado de clientes en una tabla interactiva.
   - Funciones disponibles:
     - **Agregar Cliente**: Permite agregar un nuevo cliente.
     - **Editar Cliente**: Modifica los datos de un cliente existente.
     - **Eliminar Cliente**: Borra un cliente del sistema (solo para `ADMIN`).
   - Validación de formularios para garantizar la integridad de los datos ingresados.

5. **Gestión de Usuarios**  
   - Exclusiva para el rol `ADMIN`.
   - Funciones disponibles:
     - **Agregar Usuario**: Crear un nuevo usuario, definiendo su nombre, contraseña y rol.
     - **Editar Usuario**: Modificar la información de un usuario existente.
     - **Eliminar Usuario**: Eliminar usuarios innecesarios o no autorizados.
   - Se asegura que los datos sensibles, como contraseñas, se manejen de forma segura.

6. **Auditoría**  
   - Registro de todas las actividades realizadas por los usuarios.
   - Incluye:
     - Inicio de sesión.
     - Operaciones CRUD en las gestiones de clientes y usuarios.
   - Permite filtrar y buscar actividades para un seguimiento detallado.

7. **Consulta de Clima**  
   - Funcionalidad para consultar información meteorológica basada en la ciudad ingresada.
   - Los datos se obtienen de una API externa.
   - Muestra detalles como temperatura, humedad, velocidad del viento y condiciones generales.

## Flujo de Rutas

1. **Rutas Públicas**
   - `/`: Página de Login.
   - `/logout`: Redirección para cerrar sesión.

2. **Rutas Protegidas**
   - `/admin-dashboard`: Dashboard del administrador (solo para usuarios `ADMIN`).
   - `/user-dashboard`: Dashboard del usuario (solo para usuarios `USER`).
   - `/clientes`: Gestión de Clientes.
   - `/usuarios`: Gestión de Usuarios (solo para `ADMIN`).
   - `/auditoria`: Auditoría (solo para `ADMIN`).
   - `/clima`: Consulta de clima.

## Scripts Disponibles

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Optimiza la compilación para el mejor rendimiento.

## Requisitos

- **Node.js**: Versión 16 o superior.
- **NPM**: Instalado con Node.js.
- **Servidor de Backend**: La API debe estar ejecutándose para que las funcionalidades estén disponibles.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/mleon98/admin-clientes.git

# Cambiate al Directorio:
   
cd admin-clientes

# Instala las dependencias:

3. npm install

# Ejecuta la aplicación:

4. npm start

### Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
