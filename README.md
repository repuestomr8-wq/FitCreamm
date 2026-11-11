# FitCream — Landing page profesional

Sitio público para clientes de FitCream: helados artesanales bajos en azúcar y altos en proteína.

## Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Vite | React 18, Vite 5 |
| Estilos | Tailwind CSS | 3.4 |
| Animaciones | GSAP + Lenis | GSAP 3.12.7, Lenis 1.1.14 |
| Backend | Node.js + Express | Express 4.19 |
| Base de datos | MongoDB Atlas + Mongoose | Mongoose 8.5 |

## Estructura

```
fitcream/
├── client/          # React + Vite (frontend)
│   ├── src/
│   │   ├── components/   # Navbar, Footer, UI componentes
│   │   ├── sections/     # Hero, Nosotros, Catalogo, Pedido, Contacto
│   │   ├── context/      # CartContext (carrito de compras)
│   │   ├── hooks/        # useProducts, useScrollAnimation
│   │   ├── services/     # api.js (fetch a endpoints)
│   │   ├── styles/       # globals.css (Tailwind + tokens)
│   │   └── assets/img/   # Imágenes del sitio
├── server/          # Express + Mongoose (backend)
│   ├── config/         # db.js (conexión MongoDB)
│   ├── models/         # Producto.js, Pedido.js
│   ├── routes/         # productos.js, pedidos.js
│   └── seed/           # productos.js (seed de los 5 sabores)
├── .env.example        # Copia a .env y pon tu MONGODB_URI
└── README.md
```

## Primeros pasos

### 1. Configurar variables de entorno

```bash
cp .env.example .env
# Edita .env y pon tu MONGODB_URI de MongoDB Atlas
```

### 2. Instalar dependencias

```bash
# Servidor
cd server
npm install

# Cliente
cd ../client
npm install
```

### 3. Ejecutar el seed de productos

```bash
cd server
npm run seed
```

### 4. Ejecutar en desarrollo

```bash
# Terminal 1 — servidor
cd server
npm run dev   # http://localhost:5000

# Terminal 2 — cliente
cd client
npm run dev   # http://localhost:5173
```

## Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Lista productos activos |
| POST | `/api/pedidos` | Crea un pedido |
| GET | `/api/pedidos` | Lista pedidos |
| GET | `/api/health` | Salud del servidor |

## Identidad visual

- **Verde primario:** `#2e7d32` (botones, acentos)
- **Verde oscuro:** `#1b5e20` (footer, hover)
- **Fondo claro:** `#f1f8f1` (secciones alternadas)
- **Tipografía:** Poppins (títulos), Montserrat (cuerpo)

## Pendientes / Por validar

- [ ] URI de MongoDB Atlas en `.env`
- [ ] Imágenes optimizadas a WebP (actualmente en JPG)
- [ ] Configurar dominio de producción y CORS en `CLIENT_URL`
- [ ] Panel de administración para gestionar productos y pedidos
- [ ] Integración con pasarela de pagos (Wompi, PayU, etc.)
