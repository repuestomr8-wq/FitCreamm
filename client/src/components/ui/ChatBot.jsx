import { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy tu asistente virtual de FitCream. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const RESPUESTAS = {
    precios: 'Nuestros helados van desde $9.000 hasta $10.500 COP. Todos son bajos en azúcar y altos en proteína.',
    sabores: 'Tenemos 5 sabores: Chocolate Proteico, Vainilla Fit, Fresa Light, Mantequilla de Maní Proteica y Café Proteico.',
    proteina: 'Cada porción de 100 g tiene entre 13 g y 18 g de proteína. El de maní tiene 18 g por porción.',
    pedido: 'Puedes hacer tu pedido en la sección "Pedidos" de nuestra página. Solo selecciona el sabor y la cantidad.',
    default: 'Pregúntame sobre precios, sabores, proteína o cómo hacer un pedido. Estoy aquí para ayudarte.',
  };

  const getResponse = (texto) => {
    const t = texto.toLowerCase();
    if (t.includes('precio') || t.includes('cuesta') || t.includes('vale')) return RESPUESTAS.precios;
    if (t.includes('sabor') || t.includes('gusto')) return RESPUESTAS.sabores;
    if (t.includes('proteína') || t.includes('proteina')) return RESPUESTAS.proteina;
    if (t.includes('pedido') || t.includes('comprar')) return RESPUESTAS.pedido;
    return RESPUESTAS.default;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: getResponse(userText) }]);
      setIsTyping(false);
    }, 800);
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-fitcream-500 text-white flex items-center justify-center shadow-lg hover:bg-fitcream-600 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-fitcream-500"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat de asistencia'}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[340px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-fitcream-500 p-4 text-white flex justify-between items-center">
            <h3 className="font-display font-bold">Asistente FitCream</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 text-2xl leading-none"
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-fitcream-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] p-3 rounded-xl ${
                  msg.sender === 'bot'
                    ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                    : 'bg-fitcream-500 text-white rounded-tr-none ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-tl-none max-w-[60%]">
                Escribiendo...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-800 focus:ring-2 focus:ring-fitcream-500 focus:outline-none text-sm"
            />
            <button
              onClick={sendMessage}
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

export default ChatBot;
