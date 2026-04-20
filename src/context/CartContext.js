import React from 'react';
import { products } from '../data/products';

const CartContext = React.createContext(null);

const initialCart = [
  { productId: 'p1', quantity: 1 },
  { productId: 'p4', quantity: 1 },
];

export function CartProvider({ children }) {
  const [entries, setEntries] = React.useState(initialCart);

  const addToCart = React.useCallback((productOrId) => {
    const productId = typeof productOrId === 'string' ? productOrId : productOrId.id;

    setEntries((current) => {
      const existing = current.find((item) => item.productId === productId);

      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { productId, quantity: 1 }];
    });
  }, []);

  const updateQuantity = React.useCallback((productId, quantity) => {
    setEntries((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.productId !== productId);
      }

      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
    });
  }, []);

  const increaseQuantity = React.useCallback((productId) => {
    setEntries((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = React.useCallback((productId) => {
    setEntries((current) =>
      current.flatMap((item) => {
        if (item.productId !== productId) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  }, []);

  const removeFromCart = React.useCallback((productId) => {
    setEntries((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = React.useCallback(() => {
    setEntries([]);
  }, []);

  const cartItems = React.useMemo(() => (
    entries
      .map((entry) => {
        const product = products.find((item) => item.id === entry.productId);

        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity: entry.quantity,
          lineTotal: product.price * entry.quantity,
        };
      })
      .filter(Boolean)
  ), [entries]);

  const cartCount = React.useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = React.useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems]
  );

  const value = React.useMemo(() => ({
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity: (productId) => {
      const found = cartItems.find((item) => item.id === productId);
      return found ? found.quantity : 0;
    },
  }), [
    addToCart,
    cartCount,
    cartItems,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    subtotal,
    updateQuantity,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
