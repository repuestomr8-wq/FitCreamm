/* ============================================================
   FitCream - Interactividad con Vanilla JavaScript
   ============================================================
   Este archivo implementa tres funcionalidades:
   1. Carrito de compras / Calculador interactivo del catálogo.
   2. Validación del formulario de pedidos (#pedido).
   3. Desplazamiento suave (smooth scroll) en el menú de navegación.
   ============================================================ */

/* ------------------------------------------------------------------
   1. CONFIGURACIÓN DE PRODUCTOS
   ------------------------------------------------------------------
   Cada producto tiene: id, nombre, precio y el selector de su fila
   en la tabla del catálogo.
   ------------------------------------------------------------------ */
const PRODUCTOS = [
  { id: 'chocolate', nombre: 'Chocolate Proteico', precio: 9500 },
  { id: 'vainilla', nombre: 'Vainilla Fit', precio: 9000 },
  { id: 'fresa', nombre: 'Fresa Light', precio: 9000 },
  { id: 'mani', nombre: 'Mantequilla de Maní Proteica', precio: 10500 },
  { id: 'cafe', nombre: 'Café Proteico', precio: 9500 },
];

/* Estado del carrito: clave = id del producto, valor = cantidad */
const carrito = {};

/* ------------------------------------------------------------------
   2. CARRITO DE COMPRAS / CALCULADOR INTERACTIVO
   ------------------------------------------------------------------ */

/**
 * Formatea un número como moneda colombiana (COP).
 * @param {number} valor - Monto a formatear.
 * @returns {string} Ejemplo: "$9.500"
 */
function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor);
}

/**
 * Crea y devuelve el contenedor HTML del resumen del carrito.
 * Se inserta debajo de la tabla del catálogo.
 */
function crearContenedorCarrito() {
  const contenedor = document.createElement('div');
  contenedor.id = 'resumen-carrito';
  contenedor.className = 'resumen-carrito';
  contenedor.innerHTML = `
    <h3>Resumen del pedido</h3>
    <table id="tabla-carrito">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio unit.</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody id="items-carrito"></tbody>
    </table>
    <div class="total-carrito">
      <strong>Total a pagar:</strong> <span id="total-carrito">$0</span>
    </div>
    <p class="mensaje-carrito" id="mensaje-carrito">
      Selecciona productos del catálogo para comenzar tu pedido.
    </p>
  `;
  return contenedor;
}

/**
 * Renderiza los ítems del carrito y actualiza el total general.
 */
function renderizarCarrito() {
  const tbody = document.getElementById('items-carrito');
  const totalElemento = document.getElementById('total-carrito');
  const mensaje = document.getElementById('mensaje-carrito');

  if (!tbody || !totalElemento || !mensaje) return;

  tbody.innerHTML = '';
  let totalGeneral = 0;
  let hayItems = false;

  PRODUCTOS.forEach((producto) => {
    const cantidad = carrito[producto.id] || 0;
    if (cantidad > 0) {
      hayItems = true;
      const subtotal = producto.precio * cantidad;
      totalGeneral += subtotal;

      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>
          <button class="btn-cantidad" data-id="${producto.id}" data-dir="-1">−</button>
          <span class="num-cantidad" data-id="${producto.id}">${cantidad}</span>
          <button class="btn-cantidad" data-id="${producto.id}" data-dir="1">+</button>
        </td>
        <td>${formatearMoneda(producto.precio)}</td>
        <td>${formatearMoneda(subtotal)}</td>
        <td>
          <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    }
  });

  totalElemento.textContent = formatearMoneda(totalGeneral);
  mensaje.textContent = hayItems
    ? 'Revisa tu resumen y completa el formulario de pedidos.'
    : 'Selecciona productos del catálogo para comenzar tu pedido.';

  // Vincular eventos de los botones del carrito
  vincularEventosCarrito();
}

/**
 * Vincula los eventos de clic a los botones del carrito (sumar, restar, eliminar).
 */
function vincularEventosCarrito() {
  document.querySelectorAll('.btn-cantidad').forEach((boton) => {
    boton.onclick = () => {
      const id = boton.dataset.id;
      const direccion = parseInt(boton.dataset.dir, 10);
      cambiarCantidad(id, direccion);
    };
  });

  document.querySelectorAll('.btn-eliminar').forEach((boton) => {
    boton.onclick = () => {
      const id = boton.dataset.id;
      eliminarProducto(id);
    };
  });
}

/**
 * Aumenta o disminuye la cantidad de un producto en el carrito.
 * @param {string} id - Identificador del producto.
 * @param {number} direccion - 1 para sumar, -1 para restar.
 */
function cambiarCantidad(id, direccion) {
  carrito[id] = (carrito[id] || 0) + direccion;
  if (carrito[id] <= 0) {
    delete carrito[id];
  }
  renderizarCarrito();
}

/**
 * Elimina completamente un producto del carrito.
 * @param {string} id - Identificador del producto.
 */
function eliminarProducto(id) {
  delete carrito[id];
  renderizarCarrito();
}

/**
 * Agrega una cantidad de un producto al carrito.
 * @param {string} id - Identificador del producto.
 * @param {number} cantidad - Cantidad a agregar.
 */
function agregarAlCarrito(id, cantidad = 1) {
  carrito[id] = (carrito[id] || 0) + cantidad;
  renderizarCarrito();
}

/**
 * Inicializa la sección del catálogo: agrega controles de cantidad
 * a cada fila de producto e inserta el resumen del carrito.
 */
function inicializarCatalogo() {
  const tabla = document.querySelector('#catalogo table tbody');
  if (!tabla) return;

  const filas = tabla.querySelectorAll('tr');

  filas.forEach((fila, indice) => {
    const producto = PRODUCTOS[indice];
    if (!producto) return;

    // Crear celda de controles si no existe
    let celdaControles = fila.querySelector('.celda-controles');
    if (!celdaControles) {
      celdaControles = document.createElement('td');
      celdaControles.className = 'celda-controles';
      fila.appendChild(celdaControles);
    }

    celdaControles.innerHTML = `
      <div class="controles-cantidad">
        <label for="qty-${producto.id}">Qty:</label>
        <input type="number" id="qty-${producto.id}" min="0" max="20" value="0" data-id="${producto.id}">
        <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
      </div>
    `;

    const inputCantidad = celdaControles.querySelector(`#qty-${producto.id}`);
    const botonAgregar = celdaControles.querySelector('.btn-agregar');

    botonAgregar.onclick = () => {
      const cantidad = parseInt(inputCantidad.value, 10) || 0;
      if (cantidad > 0) {
        agregarAlCarrito(producto.id, cantidad);
        inputCantidad.value = 0;
      }
    };
  });

  // Insertar el resumen del carrito después de la tabla
  const contenedorCatalogo = document.getElementById('catalogo');
  if (contenedorCatalogo && !document.getElementById('resumen-carrito')) {
    contenedorCatalogo.appendChild(crearContenedorCarrito());
  }
}

/* ------------------------------------------------------------------
   3. VALIDACIÓN DEL FORMULARIO DE PEDIDOS (#pedido)
   ------------------------------------------------------------------ */

/**
 * Muestra un mensaje de confirmación estilizado en pantalla.
 * @param {Object} datos - Datos del pedido (nombre, email, etc.).
 */
function mostrarConfirmacionPedido(datos) {
  // Eliminar confirmación previa si existe
  const previa = document.getElementById('confirmacion-pedido');
  if (previa) previa.remove();

  const contenedor = document.createElement('div');
  contenedor.id = 'confirmacion-pedido';
  contenedor.className = 'confirmacion-pedido';
  contenedor.innerHTML = `
    <div class="confirmacion-contenido">
      <h2>✅ Pedido recibido</h2>
      <p><strong>Hola, ${datos.nombre}!</strong> Hemos recibido tu pedido de FitCream.</p>
      <ul class="detalles-pedido">
        <li><strong>Sabor:</strong> ${datos.saborNombre}</li>
        <li><strong>Cantidad:</strong> ${datos.cantidad}</li>
        <li><strong>Dirección de entrega:</strong> ${datos.direccion || 'No especificada'}</li>
        <li><strong>Total:</strong> ${formatearMoneda(datos.total)}</li>
        <li><strong>Correo:</strong> ${datos.email}</li>
        <li><strong>Teléfono:</strong> ${datos.telefono}</li>
      </ul>
      <p class="mensaje-final">Te contactaremos pronto para confirmar la entrega.</p>
      <button class="btn-cerrar-confirmacion" id="cerrar-confirmacion">Cerrar</button>
    </div>
  `;

  // Insertar al inicio de la sección #pedido
  const seccionPedido = document.getElementById('pedido');
  if (seccionPedido) {
    seccionPedido.insertBefore(contenedor, seccionPedido.firstChild);
  }

  document.getElementById('cerrar-confirmacion').onclick = () => {
    contenedor.remove();
  };
}

/**
 * Valida que los campos requeridos del formulario estén completos.
 * @param {HTMLFormElement} form - El formulario a validar.
 * @returns {boolean} true si es válido, false en caso contrario.
 */
function validarFormularioPedido(form) {
  const nombre = form.querySelector('#nombre').value.trim();
  const email = form.querySelector('#email').value.trim();
  const telefono = form.querySelector('#telefono').value.trim();
  const sabor = form.querySelector('#sabor').value;
  const cantidad = parseInt(form.querySelector('#cantidad').value, 10);
  const direccion = form.querySelector('#direccion').value.trim();

  let valido = true;

  // Limpiar estilos de error previos
  form.querySelectorAll('.campo-error').forEach((el) => el.classList.remove('campo-error'));

  if (!nombre) {
    marcarError(form, '#nombre');
    valido = false;
  }
  if (!email) {
    marcarError(form, '#email');
    valido = false;
  }
  if (!telefono) {
    marcarError(form, '#telefono');
    valido = false;
  }
  if (!sabor) {
    marcarError(form, '#sabor');
    valido = false;
  }
  if (!cantidad || cantidad < 1) {
    marcarError(form, '#cantidad');
    valido = false;
  }
  if (!direccion) {
    marcarError(form, '#direccion');
    valido = false;
  }

  return valido;
}

/**
 * Marca un campo con error visual.
 * @param {HTMLFormElement} form - El formulario.
 * @param {string} selector - Selector CSS del campo.
 */
function marcarError(form, selector) {
  const campo = form.querySelector(selector);
  if (campo) {
    campo.classList.add('campo-error');
    campo.focus();
  }
}

/**
 * Obtiene el nombre legible de un sabor a partir de su valor.
 * @param {string} valor - Valor del select (ej. 'chocolate').
 * @returns {string} Nombre legible (ej. 'Chocolate Proteico').
 */
function obtenerNombreSabor(valor) {
  const producto = PRODUCTOS.find((p) => p.id === valor);
  return producto ? producto.nombre : valor;
}

/**
 * Inicializa el formulario de pedidos: validación en submit y cálculo del total.
 */
function inicializarFormularioPedido() {
  const form = document.querySelector('#pedido form');
  if (!form) return;

  const selectSabor = form.querySelector('#sabor');
  const inputCantidad = form.querySelector('#cantidad');
  const inputDireccion = form.querySelector('#direccion');

  // Actualizar total dinámicamente al cambiar sabor o cantidad
  function actualizarTotal() {
    const valorSabor = selectSabor.value;
    const cantidad = parseInt(inputCantidad.value, 10) || 1;
    const producto = PRODUCTOS.find((p) => p.id === valorSabor);
    const total = producto ? producto.precio * cantidad : 0;

    // Mostrar u ocultar el total debajo del formulario
    let totalElem = document.getElementById('total-pedido-preview');
    if (!totalElem) {
      totalElem = document.createElement('p');
      totalElem.id = 'total-pedido-preview';
      totalElem.className = 'total-pedido-preview';
      form.parentNode.insertBefore(totalElem, form.nextSibling);
    }
    totalElem.innerHTML = valorSabor
      ? `<strong>Total estimado:</strong> ${formatearMoneda(total)} (${cantidad} × ${obtenerNombreSabor(valorSabor)})`
      : '';
  }

  selectSabor.addEventListener('change', actualizarTotal);
  inputCantidad.addEventListener('input', actualizarTotal);
  actualizarTotal();

  // Manejar el envío del formulario
  form.onsubmit = (evento) => {
    evento.preventDefault();

    if (!validarFormularioPedido(form)) {
      alert('Por favor, completa todos los campos requeridos antes de enviar.');
      return;
    }

    const nombre = form.querySelector('#nombre').value.trim();
    const email = form.querySelector('#email').value.trim();
    const telefono = form.querySelector('#telefono').value.trim();
    const saborValor = form.querySelector('#sabor').value;
    const cantidad = parseInt(form.querySelector('#cantidad').value, 10);
    const direccion = form.querySelector('#direccion').value.trim();
    const mensaje = form.querySelector('#mensaje').value.trim();

    const producto = PRODUCTOS.find((p) => p.id === saborValor);
    const total = producto ? producto.precio * cantidad : 0;

    const datosPedido = {
      nombre,
      email,
      telefono,
      saborValor,
      saborNombre: obtenerNombreSabor(saborValor),
      cantidad,
      direccion,
      mensaje,
      total,
    };

    mostrarConfirmacionPedido(datosPedido);

    // Opcional: limpiar el formulario después de enviar
    // form.reset();
    // actualizarTotal();
  };
}

/* ------------------------------------------------------------------
   4. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL)
   ------------------------------------------------------------------ */

/**
 * Inicializa el smooth scroll para todos los enlaces de ancla internos.
 */
function inicializarSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.onclick = (evento) => {
      const id = enlace.getAttribute('href');
      if (id === '#') return;

      const destino = document.querySelector(id);
      if (!destino) return;

      evento.preventDefault();

      destino.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Opcional: actualizar URL sin recargar
      history.pushState(null, null, id);
    };
  });
}

/* ------------------------------------------------------------------
   5. INICIALIZACIÓN GLOBAL
   ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
  inicializarCatalogo();
  inicializarFormularioPedido();
  inicializarSmoothScroll();
  inicializarChatbot();
});

/* ============================================================
   6. CHATBOT ASISTENTE VIRTUAL FITCREAM
   ============================================================
   Actúa como asesor nutricional y de ventas de FitCream.
   Responde dudas sobre helados proteicos, precios en COP y
   recomienda sabores según la necesidad del usuario.
   ============================================================ */

/* Configuración del chatbot */
const CHAT_CONFIG = {
  nombre: 'FitCream',
  colores: {
    primario: '#2e7d32',
    secundario: '#1b5e20',
  },
};

/* Respuestas del bot categorizadas por intención */
const RESPUESTAS_BOT = {
  saludo: [
    '¡Hola! Soy tu asistente virtual de FitCream. ¿En qué puedo ayudarte hoy?',
    '¡Bienvenido/a a FitCream! ¿Tienes alguna duda sobre nuestros helados proteicos?',
  ],
  precios: [
    'Nuestros precios en COP son: Chocolate Proteico $9.500, Vainilla Fit $9.000, Fresa Light $9.000, Mantequilla de Maní Proteica $10.500 y Café Proteico $9.500. ¿Te interesa algún sabor en particular?',
    'Los helados FitCream van desde $9.000 hasta $10.500 COP. Todos son bajos en azúcar y altos en proteína.',
  ],
  sabores: [
    'Disponemos de 5 sabores: Chocolate Proteico, Vainilla Fit, Fresa Light, Mantequilla de Maní Proteica y Café Proteico. ¿Cuál te llama más la atención?',
    'Tenemos sabores deliciosos y saludables: Chocolate, Vainilla, Fresa, Maní y Café. Todos son proteicos y bajos en calorías.',
  ],
  proteina: [
    'Cada porción de 100 g de nuestros helados tiene entre 13 g y 18 g de proteína. El sabor con más proteína es Mantequilla de Maní con 18 g por porción.',
    'Sí, todos nuestros helados son altos en proteína. Van desde 13 g hasta 18 g de proteína por cada 100 g. ¡Ideal para tu plan nutricional!',
  ],
  calorias: [
    'Nuestros helados son bajos en calorías: van desde 105 kcal hasta 140 kcal por cada 100 g. La opción más ligera es Fresa Light con 105 kcal.',
    'Cuidamos tu alimentación. Nuestros helados tienen entre 105 y 140 kcal por porción, perfectos para una vida saludable.',
  ],
  recomendacion: [
    'Si buscas algo dulce y clásico, te recomiendo Chocolate Proteico ($9.500). Si prefieres algo más suave, Vainilla Fit ($9.000) es ideal. ¿Qué buscas hoy?',
    'Para un snack post-entrenamiento, la Mantequilla de Maní Proteica ($10.500) tiene la mayor cantidad de proteína. ¿Te gustaría saber más?',
  ],
  pedido: [
    'Para hacer un pedido, ve a la sección "Pedidos" y completa el formulario con tu nombre, correo, teléfono, sabor, cantidad y dirección. ¡Te contactaremos pronto!',
    'Puedes hacer tu pedido directamente desde la sección de Pedidos de nuestra web. Solo selecciona el sabor y la cantidad que necesites.',
  ],
  default: [
    'Entiendo. ¿Te gustaría información sobre nuestros precios, sabores o contenido de proteína? También puedo recomendarte un sabor según lo que busques.',
    'No estoy seguro de entender tu consulta. Pregúntame sobre precios, sabores, proteínas o cómo hacer un pedido. Estoy aquí para ayudarte.',
  ],
};

/**
 * Determina la respuesta del bot según el mensaje del usuario.
 * @param {string} mensaje - Texto escrito por el usuario.
 * @returns {string} Respuesta del asistente.
 */
function obtenerRespuesta(mensaje) {
  const texto = mensaje.toLowerCase();

  if (texto.includes('hola') || texto.includes('buenas') || texto.includes('hello')) {
    return RESPUESTAS_BOT.saludo[Math.floor(Math.random() * RESPUESTAS_BOT.saludo.length)];
  }
  if (texto.includes('precio') || texto.includes('costo') || texto.includes('vale') || texto.includes('cuesta')) {
    return RESPUESTAS_BOT.precios[Math.floor(Math.random() * RESPUESTAS_BOT.precios.length)];
  }
  if (texto.includes('sabor') || texto.includes('gusto') || texto.includes('disponible')) {
    return RESPUESTAS_BOT.sabores[Math.floor(Math.random() * RESPUESTAS_BOT.sabores.length)];
  }
  if (texto.includes('proteína') || texto.includes('proteina') || texto.includes('proteico')) {
    return RESPUESTAS_BOT.proteina[Math.floor(Math.random() * RESPUESTAS_BOT.proteina.length)];
  }
  if (texto.includes('caloría') || texto.includes('caloria') || texto.includes('kcal')) {
    return RESPUESTAS_BOT.calorias[Math.floor(Math.random() * RESPUESTAS_BOT.calorias.length)];
  }
  if (texto.includes('recomien') || texto.includes('mejor') || texto.includes('elegir')) {
    return RESPUESTAS_BOT.recomendacion[Math.floor(Math.random() * RESPUESTAS_BOT.recomendacion.length)];
  }
  if (texto.includes('pedido') || texto.includes('comprar') || texto.includes('ordenar')) {
    return RESPUESTAS_BOT.pedido[Math.floor(Math.random() * RESPUESTAS_BOT.pedido.length)];
  }

  return RESPUESTAS_BOT.default[Math.floor(Math.random() * RESPUESTAS_BOT.default.length)];
}

/**
 * Agrega un mensaje al contenedor de chat.
 * @param {string} texto - Contenido del mensaje.
 * @param {string} tipo - 'bot', 'user' o 'system'.
 */
function agregarMensaje(texto, tipo) {
  const contenedor = document.getElementById('chat-messages');
  if (!contenedor) return;

  const mensaje = document.createElement('div');
  mensaje.className = `message ${tipo}`;
  mensaje.textContent = texto;
  contenedor.appendChild(mensaje);
  contenedor.scrollTop = contenedor.scrollHeight;
}

/**
 * Genera la respuesta del bot tras un breve retraso para simular escritura.
 * @param {string} textoUsuario - Mensaje del usuario.
 */
function mostrarRespuestaBot(textoUsuario) {
  setTimeout(() => {
    const respuesta = obtenerRespuesta(textoUsuario);
    agregarMensaje(respuesta, 'bot');
  }, 800);
}

/**
 * Inicializa el chatbot: eventos de apertura, cierre, envío y respuestas rápidas.
 */
function inicializarChatbot() {
  const bubble = document.getElementById('chat-bubble');
  const ventana = document.getElementById('chat-window');
  const btnCerrar = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const btnEnviar = document.getElementById('chat-enviar');
  const quickReplies = document.querySelectorAll('.quick-reply');

  if (!bubble || !ventana) return;

  let abierto = false;

  function toggleVentana() {
    abierto = !abierto;
    if (abierto) {
      ventana.classList.add('open');
      bubble.querySelector('span').textContent = '✕';
    } else {
      ventana.classList.remove('open');
      bubble.querySelector('span').textContent = '🤖';
    }
  }

  bubble.onclick = toggleVentana;

  btnCerrar.onclick = (e) => {
    e.stopPropagation();
    abierto = false;
    ventana.classList.remove('open');
    bubble.querySelector('span').textContent = '🤖';
  };

  function enviarMensaje() {
    const texto = input.value.trim();
    if (!texto) return;

    agregarMensaje(texto, 'user');
    input.value = '';
    mostrarRespuestaBot(texto);
  }

  btnEnviar.onclick = enviarMensaje;

  input.onkeypress = (e) => {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  };

  quickReplies.forEach((btn) => {
    btn.onclick = () => {
      const pregunta = btn.dataset.pregunta;
      agregarMensaje(pregunta, 'user');
      mostrarRespuestaBot(pregunta);
    };
  });

  document.addEventListener('click', (e) => {
    if (abierto && !ventana.contains(e.target) && !bubble.contains(e.target)) {
      abierto = false;
      ventana.classList.remove('open');
      bubble.querySelector('span').textContent = '🤖';
    }
  });
}
