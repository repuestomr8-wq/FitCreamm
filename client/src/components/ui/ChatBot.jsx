import { useState, useEffect, useRef } from 'react';

const WHATSAPP_URL =
  'https://wa.me/573007665191?text=' +
  encodeURIComponent('¡Hola! Quiero hacer un pedido de helados FitCream 🍦');

const CHATBOT_POSITION = 'fixed bottom-6 right-24 z-[9999]';

const BENEFICIOS_GENERALES = [
  '20 g de proteína de suero de leche por porción',
  'Bajos en calorías y sin azúcar añadida',
  'Ingredientes naturales y artesanales',
  'Ideal para post-entreno o planes nutricionales',
];

const SABORES = [
  { nombre: 'Chocolate Proteico', proteinas: '20 g', calorias: '180 kcal' },
  { nombre: 'Vainilla Fit', proteinas: '18 g', calorias: '120 kcal' },
  { nombre: 'Fresa Light', proteinas: '17 g', calorias: '105 kcal' },
  { nombre: 'Mantequilla de Maní Proteica', proteinas: '20 g', calorias: '210 kcal' },
  { nombre: 'Café Proteico', proteinas: '18 g', calorias: '130 kcal' },
];

const CHATBOT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! 🍦 Soy el asistente de FitCream. ¿En qué te puedo ayudar hoy?',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // ---------- Motor de respuestas por palabras clave ----------
  const normalizar = (texto) => texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const obtenerRespuesta = (textoUsuario) => {
    const texto = normalizar(textoUsuario);

    // Sabores / Menú / Helados / Calorías
    if (
      texto.includes('sabor') ||
      texto.includes('menu') ||
      texto.includes('helado') ||
      texto.includes('caloria') ||
      texto.includes('calorias')
    ) {
      const lista = SABORES.map((s) => `• ${s.nombre}: ${s.proteinas} de proteína, ${s.calorias} (por 100 g)`).join('\n');
      return `Nuestros helados artesanales por porción de 100 g son:\n\n${lista}\n\nTodos son altos en proteína y bajos en azúcar.`;
    }

    // Proteína / Azúcar / Saludable / Dieta / Ingredientes
    if (
      texto.includes('proteina') ||
      texto.includes('azucar') ||
      texto.includes('saludable') ||
      texto.includes('dieta') ||
      texto.includes('ingrediente')
    ) {
      return `Nuestros helados artesanales están elaborados con:\n${BENEFICIOS_GENERALES.map((b) => `• ${b}`).join('\n')}\n\nSon ideales para tu plan nutricional o después de entrenar.`;
    }

    // Pedido / Comprar / Envío / Domicilio / Carrito
    if (
      texto.includes('pedido') ||
      texto.includes('comprar') ||
      texto.includes('envio') ||
      texto.includes('domicilio') ||
      texto.includes('carrito')
    ) {
      return `Para hacer un pedido:\n\n1. Ve a la sección "Catálogo" y elige tus sabores favoritos.\n2. Agrega los productos al carrito.\n3. Ve a la sección "Pedidos" y completa tus datos de entrega.\n4. Selecciona tu método de pago y confirma.\n\n¡Así de fácil!`;
    }

    // Pago / Efectivo / Tarjeta / Transferencia / Nequi / Daviplata
    if (
      texto.includes('pago') ||
      texto.includes('efectivo') ||
      texto.includes('tarjeta') ||
      texto.includes('transferencia') ||
      texto.includes('nequi') ||
      texto.includes('daviplata')
    ) {
      return `Aceptamos los siguientes métodos de pago:\n\n• Efectivo contra entrega (puedes calcular el cambio al pagar)\n• Tarjeta de Crédito / Débito\n• Transferencia / Nequi / Daviplata\n\nElige el que más te convenga al finalizar tu pedido.`;
    }

    // Contacto / WhatsApp / Asesor / Teléfono / Ayuda
    if (
      texto.includes('contacto') ||
      texto.includes('whatsapp') ||
      texto.includes('asesor') ||
      texto.includes('telefono') ||
      texto.includes('ayuda')
    ) {
      return `Puedes contactarnos directamente por WhatsApp al número +57 300 766 5191.\n\nHaz clic aquí para abrir WhatsApp: https://wa.me/573007665191?text=${encodeURIComponent('¡Hola! Quiero hacer un pedido de helados FitCream 🍦')}`;
    }

    // Respuesta por defecto
    return `No entendí tu consulta. 🤔\n\nPuedes elegir una de estas opciones:\n\n• 🍦 Sabores y Calorías\n• 💪 Beneficios Nutricionales\n• 🛒 ¿Cómo hacer un pedido?\n• 💳 Métodos de pago\n• 📞 Hablar por WhatsApp\n\nO escríbenos directamente por WhatsApp para asistencia personalizada.`;
  };

  // ---------- Envío de mensajes ----------
  const enviarMensaje = () => {
    if (!input.trim()) return;
    const textoUsuario = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: textoUsuario }]);
    setShowQuickQuestions(false);
    setIsTyping(true);
    setTimeout(() => {
      const respuesta = obtenerRespuesta(textoUsuario);
      setMessages((prev) => [...prev, { sender: 'bot', text: respuesta }]);
      setIsTyping(false);
    }, 800);
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  const chipClick = (texto) => {
    setInput(texto);
    setShowQuickQuestions(false);
    enviarMensaje();
  };

  const chipsRapidos = [
    { label: '🍦 Sabores y Calorías', texto: 'sabores y calorías' },
    { label: '💪 Beneficios Nutricionales', texto: 'beneficios nutricionales' },
    { label: '🛒 ¿Cómo hacer un pedido?', texto: 'cómo hacer un pedido' },
    { label: '💳 Métodos de pago', texto: 'métodos de pago' },
    { label: '📞 Hablar por WhatsApp', texto: 'hablar por whatsapp' },
  ];

  return (
    <div className="fixed bottom-6 right-24 z-[9999] font-sans">
      {/* Botón flotante del chat con imagen */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-fitcream-500 text-white flex items-center justify-center shadow-2xl hover:bg-fitcream-600 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-fitcream-500"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat de asistencia'}
      >
        <img
          src="/img/chatbot.png"
          alt="Chatbot FitCream"
          className="w-7 h-7 object-contain"
        />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-24 w-[360px] h-[620px] bg-white rounded-2xl shadow-2xl border border-fitcream-100 flex flex-col overflow-hidden">
          {/* Encabezado del chat */}
          <div className="bg-fitcream-500 p-4 text-white flex justify-between items-center">
            <h3 className="font-display font-bold text-lg">Asistente FitCream</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 text-2xl leading-none"
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] p-3 rounded-xl ${
                  msg.sender === 'bot'
                    ? 'bg-fitcream-50 border border-fitcream-100 text-gray-800 rounded-tl-none'
                    : 'bg-fitcream-500 text-white rounded-tr-none ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-fitcream-50 border border-fitcream-100 text-gray-700 p-3 rounded-tl-none max-w-[60%]">
                Escribiendo...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Botones de acceso rápido - SOLO VISIBLES SI showQuickQuestions */}
          {showQuickQuestions && (
            <div className="p-4 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Preguntas rápidas</p>
              <div className="flex flex-wrap gap-2">
                {chipsRapidos.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => chipClick(chip.texto)}
                    className="px-3 py-1.5 rounded-full bg-white border border-fitcream-200 text-xs font-medium text-fitcream-600 hover:bg-fitcream-50 hover:text-fitcream-500 transition-colors"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campo de entrada de texto */}
          <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-800 focus:ring-2 focus:ring-fitcream-500 focus:outline-none text-sm"
            />
            <button
              onClick={enviarMensaje}
              className="w-10 h-10 rounded-full bg-fitcream-500 text-white flex items-center justify-center hover:bg-fitcream-600 transition-colors"
              aria-label="Enviar mensaje"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CHATBOT;
