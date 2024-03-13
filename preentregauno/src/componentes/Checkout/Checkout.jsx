import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import './checkout.css';

const Checkout = () => {
    const { cart, totalCarrito, cantidadCarrito, vaciarCarrito } = useContext(CartContext);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmacion, setEmailConfirmacion] = useState('');
    const [error, setError] = useState('');
    const [ordenId, setOrdenId] = useState('');

    const handleForm = (event) => {
        
    };

    return (

        <div className="checkoutContainer">

            <div className="checkoutForm">
                <h2>Ingresa tus datos</h2>
                <form onSubmit={handleForm}>
                    <div className='formField'>
                        <label htmlFor="Nombre">Nombre</label>
                        <input name='Nombre' type="text" onChange={(e) => setNombre(e.target.value)}/>
                    </div>
                    <div className='formField'>
                        <label htmlFor="Apellido">Apellido</label>
                        <input name='Apellido' type="text" onChange={(e) => setApellido(e.target.value)}/>
                    </div>
                    <div className='formField'>
                        <label htmlFor="Teléfono">Teléfono</label>
                        <input name='Teléfono' type="text" onChange={(e) => setTelefono(e.target.value)}/>
                    </div>
                    <div className='formField'>
                        <label htmlFor="Email">Email</label>
                        <input name='Email' type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='formField'>
                        <label htmlFor="EmailConfirmación">Email Confirmación</label>
                        <input name='EmailConfirmación' type="text" onChange={(e) => setEmailConfirmacion(e.target.value)}/>
                    </div>

                    <button className='checkout' type='submit'>Completar compra</button>

                    {error && <p style={{color:'red'}}>{error}</p>}
                    {ordenId && (
                        <b>
                            Gracias por elegirnos! Tu número de orden es: {ordenId}
                        </b>
                    )}
                </form>
            </div>

            <div className="productList">

                <h2>Resumen de la compra</h2>
                {cart.map((item) => (

                    <div key={item.id}>
                        {""}
                        <p>
                            {item.nombre} x {item.cantidad}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checkout;