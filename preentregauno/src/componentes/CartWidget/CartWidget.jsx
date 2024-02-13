import React from 'react'
import './CartWidget.css'

const CartWidget = () => {
    return (
        <>
        <div className='carrito'>
            <img className='cartWidget' src="./assets/img/carrito.png" alt="carrito"/>
            <p>0</p>
        </div>
        </>
        
    )
}

export default CartWidget