import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import './checkout.css';
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Checkout = () => {
    const { cart, totalCarrito, vaciarCarrito } = useContext(CartContext);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmacion, setEmailConfirmacion] = useState('');
    const [error, setError] = useState('');
    const [ordenId, setOrdenId] = useState('');

    const handleForm = (event) => {
        event.preventDefault();

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (email !== emailConfirmacion) {
            setError('Las direcciones de correo electrónico no coinciden.');
            return;
        }

        const orden = {
            items: cart.map((item) => ({
                id: item.id,
                nombre: item.nombre,
                cantidad: item.cantidad
            })),
            total: totalCarrito(),
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        };

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, 'productos', productoOrden.id);
                const productoDoc = await getDoc(productoRef);

                if (productoDoc.exists()) {
                    const stockActual = productoDoc.data().stock;

                    await updateDoc(productoRef, {
                        stock: stockActual - productoOrden.cantidad
                    });
                } else {
                    setError('Algo salió mal al procesar la orden. Por favor, inténtalo de nuevo.');
                }
            })
        )
        .then(() => {
            addDoc(collection(db,'ordenes'), orden)
            .then((docRef) => {
                setError('');
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch((error) => {
                console.error(error);
                setError('Se produjo un error al crear la orden.');
            });
        })
        .catch((error) => {
            console.error(error);
            setError('Se produjo un error al actualizar el stock.');
        });
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

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {ordenId && (
                        <b>
                            Gracias por elegirnos, tu número de orden es: {ordenId}
                        </b>
                    )}
                </form>
            </div>
            <div className="productList">
                <h2>Resumen de la compra</h2>
                {cart.map((item) => (
                    <div key={item.id}>
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