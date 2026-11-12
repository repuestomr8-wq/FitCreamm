import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import Nosotros from './sections/Nosotros';
import Catalogo from './sections/Catalogo';
import Pedido from './sections/Pedido';
import Contacto from './sections/Contacto';
import Footer from './components/layout/Footer';
import CartDrawer from './components/ui/CartDrawer';
import ChatBot from './components/ui/ChatBot';
import WhatsAppButton from './components/ui/WhatsAppButton';
import SkipToContent from './components/ui/SkipToContent';
import { CartProvider } from './context/CartContext';
import { useLenis } from './hooks/useLenis';

function App() {
  const { lenisRef } = useLenis();

  return (
    <CartProvider>
      <HelmetProvider>
        <div ref={lenisRef} className="flex flex-col min-h-svh">
          <SkipToContent />
          <Navbar />
          <main className="flex-grow relative">
            <Hero />
            <Nosotros />
            <Catalogo />
            <Pedido />
            <Contacto />
          </main>
          <Footer />
          <CartDrawer />
          <ChatBot />
          <WhatsAppButton />
        </div>
      </HelmetProvider>
    </CartProvider>
  );
}

export default App;
