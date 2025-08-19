# 🌦️ Aplicación Estaciones Climáticas - Prueba Técnica SIATA

Una aplicación web moderna desarrollada como prueba técnica para SIATA (Sistema de Alerta Temprana de Medellín y el Valle de Aburrá), que permite la gestión y visualización de estaciones meteorológicas a través de una interfaz intuitiva y responsiva.

## 🚀 Demo en Vivo

🔗 **[Ver aplicación desplegada en Vercel](https://tu-proyecto-siata.vercel.app)**

## 📋 Descripción del Proyecto

Esta aplicación frontend está desarrollada en React con TypeScript y presenta un sistema completo de gestión de estaciones climáticas para SIATA. La aplicación incluye funcionalidades de autenticación con AuthGuard, visualización de datos meteorológicos y una interfaz moderna y responsiva.

### Características Principales

- 🔐 **Sistema de Autenticación** con AuthGuard para manejo de rutas públicas/privadas
- 🛡️ **AuthGuard Personalizado** para protección y redirección de rutas
- 🌡️ **Gestión de Estaciones Climáticas** mediante Mock API
- 🗺️ **Sistema de Rutas Avanzado** con protección basada en autenticación
- 📱 **Diseño Responsivo** optimizado para todos los dispositivos
- 🎨 **Interfaz Moderna** con Tailwind CSS y HeadlessUI
- ⚡ **Navegación Fluida** con React Router (App Router)
- 🗂️ **Estado Global** gestionado con Context API y useReducer

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework:** React 18 con TypeScript
- **Ruteo:** React Router (App Router)
- **Gestión de Estado:** Context API + useReducer
- **Estilos:** Tailwind CSS + HeadlessUI
- **Build Tool:** Vite
- **Despliegue:** Vercel
- **Persistencia:** Local Storage

## 🏗️ Arquitectura

El proyecto sigue una **Screaming Architecture** organizada de la siguiente manera:

```
src/
├── components/           # Componentes reutilizables por dominio
│   ├── auth/            # Componentes de autenticación
│   ├── profile/         # Componentes de perfil de usuario
│   ├── stations/        # Componentes de estaciones meteorológicas
│   ├── icons.tsx        # Iconos reutilizables
│   ├── navbar.tsx       # Barra de navegación
│   └── primitives.ts    # Componentes primitivos base
├── config/              # Configuraciones de la aplicación
│   └── site.ts          # Configuración general del sitio
├── hooks/               # Custom hooks organizados por dominio
│   ├── profile/         # Hooks relacionados con perfil
│   ├── register/        # Hooks de registro
│   ├── stations/        # Hooks de estaciones
│   ├── useAuth.ts       # Hook principal de autenticación
│   └── useFormValidation.ts # Hook de validación de formularios
├── layouts/             # Layouts de la aplicación
│   └── default.tsx      # Layout por defecto
├── pages/               # Páginas principales de la aplicación
├── providers/           # Context providers y estado global
├── routes/              # Configuración de rutas y protección
├── services/            # Servicios para comunicación con APIs
├── styles/              # Estilos globales
├── types/               # Definiciones de TypeScript organizadas
├── utils/               # Funciones utilitarias
├── App.tsx             # Componente principal de la aplicación
├── main.tsx            # Punto de entrada de la aplicación
└── vite-env.d.ts       # Tipos de entorno de Vite
```

### AuthGuard y Sistema de Rutas

El **AuthGuard** es el componente central que maneja toda la lógica de protección de rutas:

- **Rutas Públicas**: Login, registro (accesibles sin autenticación)
- **Rutas Privadas**: Dashboard, estaciones, perfil (requieren autenticación)
- **Redirecciones Inteligentes**: Automáticas basadas en el estado de autenticación
- **Persistencia de Rutas**: Recordar la última ruta visitada antes del login

## 🚀 Instalación y Ejecución Local

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para ejecutar localmente

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jmartinezgr/prueba-tecnica-siata
   cd siata-weather-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`

### Scripts disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter para revisar el código

## 🎯 Funcionalidades

### 🛡️ Sistema de Autenticación y Rutas
- **AuthGuard** robusto que controla el acceso a rutas
- **Rutas públicas** (Login) vs **Rutas privadas** (Dashboard, Estaciones)
- **Redirecciones automáticas** basadas en estado de autenticación
- **Persistencia de sesión** mediante Local Storage
- **Protección de rutas** a nivel de componente

### 🌡️ Gestión de Estaciones
- Visualización de lista completa de estaciones meteorológicas
- Información detallada de cada estación
- Datos en tiempo real mediante Mock API
- Filtros y búsqueda de estaciones

### 📱 Interfaz de Usuario
- Diseño responsivo adaptable a móviles, tablets y desktop
- Componentes accesibles y modernos
- Transiciones suaves y animaciones
- Tema consistente en toda la aplicación

## 🎨 Decisiones de Diseño

### ¿Por qué AuthGuard personalizado?
- **Control granular** sobre el acceso a rutas
- **Lógica centralizada** de autenticación
- **Redirecciones inteligentes** que mejoran la UX
- **Fácil mantenimiento** y escalabilidad del sistema de rutas
- **Separación de responsabilidades** entre routing y autenticación

### ¿Por qué esta arquitectura de carpetas?
- **Separación clara** de responsabilidades por dominio
- **Escalabilidad** para futuras funcionalidades
- **Mantenibilidad** mejorada del código
- **Fácil localización** de archivos y componentes
- **Reutilización** optimizada de componentes

### ¿Por qué React + TypeScript?
- **Tipado estático** para mayor robustez y menos errores en runtime
- **Desarrollo más eficiente** con autocompletado e IntelliSense
- **Mantenibilidad** mejorada del código a largo plazo

### ¿Por qué Context API + useReducer?
- **Estado global centralizado** sin necesidad de librerías externas
- **Lógica predecible** para las actualizaciones de estado
- **Menor bundle size** comparado con Redux u otras alternativas

### ¿Por qué Tailwind CSS + HeadlessUI?
- **Desarrollo rápido** con clases utilitarias
- **Consistencia** en el diseño
- **Componentes accesibles** out-of-the-box
- **Optimización automática** del CSS final

### ¿Por qué Local Storage para autenticación?
- **Simplicidad** para una prueba técnica
- **Persistencia** de sesión entre recargas
- **No requiere backend** para el manejo de tokens

## 📸 Screenshots de la Aplicación

### Pantalla de Login
![Login Screen](./screenshots/login.png)
*Interfaz de autenticación con diseño moderno y validaciones*

### Dashboard Principal
![Dashboard](./screenshots/dashboard.png)
*Vista principal con listado de estaciones meteorológicas*

### Detalle de Estación
![Station Detail](./screenshots/station-detail.png)
*Información detallada de cada estación climática*

### Vista Móvil
![Mobile View](./screenshots/mobile-view.png)
*Interfaz responsiva optimizada para dispositivos móviles*

## 🔧 Configuración de la Mock API

La aplicación utiliza una Mock API proporcionada para la prueba técnica de SIATA. Los endpoints usados son:

```
GET /stations          # Obtener todas las estaciones
GET /stations/:id      # Obtener estación específica
POST /stations         # Crear estación
PUT /stations/:id      # Actualizar estación
DELETE /stations/:id   # Eliminar estación
```

## 🚀 Despliegue

La aplicación está desplegada en **Vercel** con las siguientes características:

- ✅ Despliegue automático desde el repositorio
- ✅ HTTPS habilitado
- ✅ Optimizaciones de rendimiento automáticas
- ✅ CDN global para carga rápida

## 📦 Build de Producción

Para generar el build de producción:

```bash
npm run build
```

El build se genera en la carpeta `dist/` y está optimizado para producción con:
- Minificación de código
- Tree shaking
- Optimización de assets
- Compresión gzip


## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/jmartinezgr)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: josemargri3@gmail.com

---

⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!

---

*Desarrollado con ❤️ para la prueba técnica de SIATA*