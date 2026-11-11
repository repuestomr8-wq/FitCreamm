import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'fitcream_cart';

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    return { items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return { items: [] };
  }
};

const initialState = loadCart();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, cantidad: i.cantidad + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, cantidad: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case 'TOGGLE_QUANTITY': {
      const { id, delta } = action.payload;
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === id ? { ...i, cantidad: i.cantidad + delta } : i
          )
          .filter((i) => i.cantidad > 0),
      };
    }
    case 'SET_QUANTITY': {
      const { id, cantidad } = action.payload;
      if (cantidad <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, cantidad } : i
        ),
      };
    }
    case 'CHECKOUT':
      return { ...state, items: [], isOpen: false };
    default:
      return state;
  }
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persistir en localStorage tras cada cambio
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items]);

  const total = state.items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const toggleQuantity = useCallback((id, delta) => {
    dispatch({ type: 'TOGGLE_QUANTITY', payload: { id, delta } });
  }, []);

  const setQuantity = useCallback((id, cantidad) => {
    dispatch({ type: 'SET_QUANTITY', payload: { id, cantidad } });
  }, []);

  const checkout = useCallback(() => {
    dispatch({ type: 'CHECKOUT' });
  }, []);

  const value = {
    items: state.items,
    total,
    addItem,
    removeItem,
    toggleQuantity,
    setQuantity,
    checkout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};
