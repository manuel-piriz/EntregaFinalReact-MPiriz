import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = () => {
    const { cart, eliminarItem, vaciarCarrito, cantidadCarrito, totalCarrito, total, totalQuantity } = useContext(CartContext);

    useEffect(() => {
        cantidadCarrito();
        totalCarrito();
    }, [cart, cantidadCarrito, totalCarrito]);

    const EliminarItem = (itemId) => {
        eliminarItem(itemId);
    };

    const VaciarCarrito = () => {
        vaciarCarrito();
    };

    return (
        <div className='productosCarrito'>
            {cart.length === 0 ? (
                <>
                    <h2>No hay productos en el carrito</h2>
                    <Link to={'/'} className='homebtn'>Home</Link>
                </>
            ) : (
                <>
                    <h2>Productos en el carrito:</h2>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className='cartItem'>
                                <div>
                                    <img src={`${item.img}`} alt={item.nombre} />
                                </div>
                                <div>
                                    <p>{item.nombre}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <p>Precio: {item.precio}</p>
                                    <button onClick={() => EliminarItem(item.id)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='cartTotal'>
                        <p>Total Cantidad: {totalQuantity}</p>
                        <p>Total Precio: {total}</p>
                        <button onClick={VaciarCarrito}>Vaciar Carrito</button>
                        <Link to='/checkout'className='checkout'>Completar Compra</Link>                            
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;