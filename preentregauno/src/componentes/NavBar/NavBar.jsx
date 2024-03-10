import React from 'react'
import './navBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <h1 className='Header'>Todo Oficina</h1>

            <ul className='navBarLinks'>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/categoria/Laptops'}>Laptops</NavLink>
                </li>
                <li>
                    <NavLink to={'/categoria/Sillas'}>Sillas</NavLink>
                </li>
                <li>
                    <NavLink to={'/categoria/Escritorios'}>Escritorios</NavLink>
                </li>
                <li>
                    <NavLink to={'/categoria/Iluminacion'}>Iluminación</NavLink>
                </li>
            </ul>

            <CartWidget />
        </>
    )
}

export default NavBar