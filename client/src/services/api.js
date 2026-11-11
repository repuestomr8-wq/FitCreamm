const API_BASE = '/api';

export const api = {
  getProductos: async () => {
    const res = await fetch(`${API_BASE}/productos`);
    if (!res.ok) throw new Error('Error obteniendo productos');
    return res.json();
  },
  crearPedido: async (datos) => {
    const res = await fetch(`${API_BASE}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error('Error creando pedido');
    return res.json();
  },
  getPedidos: async () => {
    const res = await fetch(`${API_BASE}/pedidos`);
    if (!res.ok) throw new Error('Error obteniendo pedidos');
    return res.json();
  },
};
