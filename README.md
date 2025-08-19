# 🌦️ Aplicación Estaciones Climáticas - Prueba Técnica SIATA

Una aplicación web moderna desarrollada como prueba técnica para SIATA (Sistema de Alerta Temprana de Medellín y el Valle de Aburrá), que permite la gestión y visualización de estaciones meteorológicas a través de una interfaz intuitiva y responsiva.

## 🚀 Demo en Vivo

🔗 **[Ver aplicación desplegada en Vercel](https://prueba-tecnica-siata.vercel.app/)**

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
- **Estilos:** Tailwind CSS + HeroUI
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

### ¿Por qué Tailwind CSS + HeroUI?
- **Desarrollo rápido** con clases utilitarias
- **Consistencia** en el diseño
- **Componentes accesibles** out-of-the-box
- **Optimización automática** del CSS final

### ¿Por qué Local Storage para autenticación?
- **Simplicidad** para una prueba técnica
- **Persistencia** de sesión entre recargas
- **No requiere backend** para el manejo de tokens

### ¿Por qué paginacion en memoria y no usando los queryParams de la api ? 
- La primer idea y las más adecuada es usar directamente los parametro de la api por temas de escalibilidad y validez de la información
- MockApi no retornaba ni headers ni metadatos relacionados a la paginación y por la simplicidad del proyecto y el acabado a las utilidades que pretendia darle a la app

## 📸 Screenshots de la Aplicación

### Pantalla de Login
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/046d7cc9-84d9-4b63-a5d8-28669063d51d" />
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/e45a86f1-2731-49fb-8db1-4a9cf73090b4" />

### Dashboard Principal
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/5742f423-5f90-47e8-8fe0-54ca6935eaf3" />

### Detalle de Estación
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/be2cf7e0-5550-4f49-8308-a4bae556ea48" />

### Vista Móvil
<img width="445" height="794" alt="image" src="https://github.com/user-attachments/assets/806b794e-c469-4c00-a3ff-f1738750225c" />

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
- LinkedIn: [Tu Perfil](https://www.linkedin.com/in/juan-jose-martinez)
- Email: josemargri3@gmail.com

---

⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!

---

*Desarrollado con ❤️ para la prueba técnica de SIATA*
