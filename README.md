# TecnoStore

Plantilla de e-commerce full-stack organizada como monorepo.

## Estructura

```
TecnoStore/
├── frontend/   # Angular 17 + PrimeNG (SPA)
└── backend/    # NestJS + Mongoose + MongoDB (API REST)
```

Cada carpeta es un proyecto independiente con su propio `package.json`.

## Requisitos

- Node.js 18+
- npm 9+
- Una cuenta de [MongoDB Atlas](https://www.mongodb.com/atlas) (tier gratuito)

## Puesta en marcha

### 1. Backend (API)

```bash
cd backend
npm install
cp .env.example .env
# editar .env con tu MONGODB_URI
npm run start:dev
```

La API queda en `http://localhost:3000/api`.

### 2. Frontend (SPA)

En otra terminal:

```bash
cd frontend
npm install
npm start
```

La app queda en `http://localhost:4200`.

## Stack

**Frontend**
- Angular 17 (módulos, SSR opcional)
- PrimeNG 17 + PrimeFlex + PrimeIcons
- SCSS

**Backend**
- NestJS 10
- Mongoose 8 (driver oficial de MongoDB)
- class-validator + class-transformer (validación de DTOs)
- @nestjs/config (variables de entorno)

## Endpoints actuales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/products` | Listar productos |
| GET | `/api/products/:id` | Detalle de un producto |
| POST | `/api/products` | Crear producto |
| PATCH | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

## Próximos pasos

- [ ] Módulo de usuarios y autenticación (JWT)
- [ ] Módulo de carrito
- [ ] Módulo de órdenes con transacciones
- [ ] Conectar el frontend a la API real (reemplazar mocks)
