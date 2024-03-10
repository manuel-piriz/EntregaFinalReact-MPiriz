import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState(initialCart);

    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        cantidadCarrito();
        totalCarrito();
    }, [cart]);

    const agregarCarrito = (producto, cantidad) => {
        const existente = cart.find((item) => item.id === producto.id);

        if (existente) {
            const nuevoCart = cart.map((item) =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
            );
            setCart(nuevoCart);
        } else {
            setCart([...cart, { ...producto, cantidad }]);
        }
    };

    const eliminarItem = (itemId) => {
        const nuevoCart = cart.filter((item) => item.id !== itemId);
        setCart(nuevoCart);
    };

    const vaciarCarrito = () => {
        setCart([]);
    };

    const cantidadCarrito = () => {
        const totalQuantity = cart.reduce((total, item) => total + item.cantidad, 0);
        setTotalQuantity(totalQuantity);
    };

    const totalCarrito = () => {
        const totalPrice = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
        setTotal(totalPrice);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                totalQuantity,
                agregarCarrito,
                eliminarItem,
                vaciarCarrito,
                cantidadCarrito,
                totalCarrito,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;