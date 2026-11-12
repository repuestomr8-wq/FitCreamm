import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://fitcreamm.onrender.com';
        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { productos, loading, error };
};