import React from 'react'
import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = () => {
    return (
        <>
            <h1>Todo Oficina</h1>

            <ul>
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">Cartelera</a>
                </li>
                <li>
                    <a href="">Contacto</a>
                </li>
            </ul>

            <CartWidget/>
        </>
    )
}

export default NavBar