# Gaming Community Respawn Events

## 📝 Descripción
Plataforma fullstack moderna para comunidades gaming que permite a los usuarios crear y gestionar comunidades, organizar eventos y formar equipos. Desarrollada con Angular 18+ (frontend) y Node.js + Express (backend), implementando arquitectura MVC y características ES6.

## ⭐ Características Principales

### 🎮 Funcionalidades
- Autenticación con Discord
- Gestión de perfiles de usuario
- Creación y gestión de comunidades gaming
- Organización de eventos
- Formación de equipos
- Sistema de búsqueda avanzado
- Carga de imágenes y avatares
- Diseño responsive

### 🛠️ Stack Tecnológico
- **Frontend**: Angular 18+, Bootstrap 5.3, Firebase
- **Backend**: Node.js, Express, MongoDB
- **Autenticación**: Passport, JWT, Discord OAuth
- **Almacenamiento**: Cloudinary
- **Extras**: TypeScript, SASS, RxJS

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB
- Cuenta de Discord Developer
- Cuenta en Cloudinary
- Angular CLI (v18.2.8 o superior)
- Proyecto Firebase configurado

### Backend

1. **Clonar e instalar**:
```bash
git clone https://github.com/footalentgroup/Team-5
cd backend
npm install
```

2. **Configurar .env**:
```## Configuración de Variables de Entorno

Para ejecutar el proyecto, crea un archivo `.env` con las siguientes variables:

### Configuraciones Principales

- `PORT`: Puerto de ejecución del servidor (ej. 3000)
- `NODE_ENV`: Entorno de desarrollo (development, production)

### Servicios Externos

#### Discord OAuth
- `DISCORD_CLIENT_ID`: ID de cliente de Discord OAuth
- `DISCORD_CLIENT_SECRET`: Secret de cliente de Discord OAuth
- `DISCORD_CALLBACK_URL`: URL de callback para autenticación

#### Cloudinary
- `CLOUDINARY_CLOUD_NAME`: Nombre de la cuenta de Cloudinary
- `CLOUDINARY_API_KEY`: Clave de API de Cloudinary

#### RAWG.io
- `RAWG_API_KEY`: Clave de API para RAWG.io

#### Base de Datos
- `MONGODB_URI`: Cadena de conexión a MongoDB

#### Correo Electrónico
- `EMAIL_HOST`: Servidor SMTP
- `EMAIL_PORT`: Puerto SMTP
- `EMAIL_USER`: Usuario de correo
- `EMAIL_PASS`: Contraseña de correo

#### Autenticación
- `JWT_SECRET`: Clave secreta para tokens JWT

#### URLs
- `FRONTEND_URL`: URL del frontend en producción
- `FRONTEND_URL_LOCAL`: URL del frontend en desarrollo
```

3. **Iniciar servidor**:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### Frontend

1. **Instalar dependencias**:
```bash
cd frontend
npm install
```

2. **Configurar environment**:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    // Configuración de Firebase
  }
};
```

3. **Iniciar aplicación**:
```bash
npm start
```

## 📁 Estructura del Proyecto

### Backend
```
backend/
├── src/
│   ├── config/              # Configuraciones
│   ├── controllers/         # Controladores
│   ├── middlewares/         # Middlewares
│   ├── models/             # Modelos MongoDB
│   ├── routes/             # Rutas API
│   │   ├── auth-discord.routes.js
│   │   ├── community.routes.js
│   │   ├── event.routes.js
│   │   ├── search.routes.js
│   │   ├── team.routes.js
│   │   └── user.routes.js
│   ├── utils/              # Utilidades
│   ├── app.js             # Entrada principal
│   └── passport.js        # Config Passport
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── guards/        # Guards de rutas
│   │   ├── pages/         # Páginas principales
│   │   ├── services/      # Servicios
│   │   ├── app.component.*
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
└── package.json
```

## 📡 API Endpoints

### Autenticación
```javascript
POST /api/auth/discord/login    # Login Discord
GET  /api/auth/discord/callback # Callback
```

### Usuarios
```javascript
POST   /api/users/register     # Registro
POST   /api/users/login        # Login
GET    /api/users/profile      # Obtener perfil
PUT    /api/users/profile      # Actualizar perfil
DELETE /api/users/:id          # Eliminar cuenta
```

### Comunidades
```javascript
POST   /api/communities        # Crear
GET    /api/communities        # Listar
GET    /api/communities/:id    # Obtener
PUT    /api/communities/:id    # Actualizar
DELETE /api/communities/:id    # Eliminar
```

### Eventos y Equipos
```javascript
POST   /api/events            # Crear evento
GET    /api/teams             # Listar equipos
// ... endpoints similares para gestión
```

## 📦 Dependencias Principales

### Backend
```json
{
  "dependencies": {
    "express": "^4.21.2",
    "mongoose": "^8.8.4",
    "passport": "^0.7.0",
    "passport-discord": "^0.1.4",
    "jsonwebtoken": "^9.0.2",
    "cloudinary": "^1.41.3",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7"
  }
}
```

### Frontend
```json
{
  "dependencies": {
    "@angular/core": "^18.2.0",
    "@angular/forms": "^18.2.0",
    "bootstrap": "^5.3.3",
    "firebase": "^11.1.0",
    "@cloudinary/angular-5.x": "^1.5.4",
    "sweetalert2": "^11.15.2"
  }
}
```

## 🔧 Scripts Disponibles

### Backend
```bash
npm start     # Producción
npm run dev   # Desarrollo
npm test      # Tests
```

### Frontend
```bash
npm start   # Servidor desarrollo
npm build   # Construir producción
npm test    # Tests
```

## 👥 Contribución

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Añade nueva caracteristica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request
