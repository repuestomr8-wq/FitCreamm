import { useState } from 'react';

const WHATSAPP_NUMBER = '573007665191';
const WHATSAPP_MESSAGE = '¡Hola! Quiero hacer un pedido de helados FitCream 🍦';

const WhatsAppButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
      aria-label="Escribir por WhatsApp"
    >
      <img
        src="/img/whatsapp.png"
        alt="WhatsApp FitCream"
        className="w-6 h-6 object-contain"
      />
    </a>
  );
};

export default WhatsAppButton;
