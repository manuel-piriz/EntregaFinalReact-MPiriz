import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import './cartWidget.css';

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext);

    return (
        <Link to="/cart">
            <div className='carrito'>
                <img className='cartWidget' src="./assets/img/carrito.png" alt="carrito" />
                {totalQuantity > 0 && <p>{totalQuantity}</p>}
            </div>
        </Link>
    );
};

export default CartWidget;