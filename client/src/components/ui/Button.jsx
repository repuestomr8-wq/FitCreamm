const Button = ({ children, className = '', variant = 'primary', onClick, ...props }) => {
  const base =
    'px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
      'bg-fitcream-500 text-white hover:bg-fitcream-600 hover:shadow-[0_8px_20px_rgba(46,125,50,0.35)] focus:ring-fitcream-500',
    ghost:
      'text-fitcream-500 hover:bg-fitcream-100 focus:ring-fitcream-500',
    outline:
      'border-2 border-fitcream-500 text-fitcream-500 hover:bg-fitcream-500 hover:text-white focus:ring-fitcream-500',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
