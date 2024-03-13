import React from 'react';
import './navBar.css';
import CartWidget from '../CartWidget/CartWidget';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navContainer'>
            <div className='logo-container'>
                <Link to={'/'}>
                    <img src='./assets/img/logo.png' alt='Logo' className='logo' />
                </Link>
                <Link to={'/'}>
                    <h1>Todo Oficina</h1>
                </Link>
            </div>

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
        </div>
    );
};

export default NavBar;