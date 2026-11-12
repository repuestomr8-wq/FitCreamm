const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-fitcream-700 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-fitcream-600/30 pt-8">
          <div className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="FitCream Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <span className="font-display font-bold text-lg">Fit<span className="text-fitcream-400">Cream</span></span>
          </div>
          <p className="text-gray-400 text-sm">
            © {year} FitCream. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/fitcream"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/fitcream"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Facebook
            </a>
            <a
              href="mailto:contacto@fitcream.com"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              contacto@fitcream.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
