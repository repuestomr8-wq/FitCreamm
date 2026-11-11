import { useEffect, useState, useRef } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const linkColor = scrolled
    ? 'text-gray-800 hover:text-fitcream-600'
    : 'text-white hover:text-fitcream-300';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-black/40 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#inicio"
            className={`flex items-center gap-2 font-display font-bold tracking-tight ${
              scrolled ? 'text-fitcream-700' : 'text-white'
            }`}
          >
            <img
              src="/img/logo.png"
              alt="FitCream Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className="text-xl md:text-2xl">Fit<span className="text-fitcream-500">Cream</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium transition-colors ${linkColor}`}
                onClick={() => {
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              const el = document.getElementById('catalogo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver catálogo
          </button>
        </div>
      </div>
    </nav>
  );
};

const links = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'pedido', label: 'Pedidos' },
  { id: 'contacto', label: 'Contacto' },
];

export default Navbar;
