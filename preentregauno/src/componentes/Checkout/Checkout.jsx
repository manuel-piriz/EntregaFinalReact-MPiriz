import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import './checkout.css';
import { doc, getDoc,addDoc, collection, getFirestore, updateDoc } from 'firebase/firestore';

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
        event.preventDefault()

        if (!nombre) {
            setError('Ingresa tu nombre.');
            return;
        }
    
        if (!apellido) {
            setError('Ingresa tu apellido.');
            return;
        }
    
        if (!telefono) {
            setError('Ingresa tu número de teléfono.');
            return;
        }
    
        if (!email) {
            setError('Ingresa tu dirección de correo electrónico.');
            return;
        }
    
        if (!emailConfirmacion) {
            setError('Confirma tu dirección de correo electrónico.');
            return;
        }
    
        if (email !== emailConfirmacion) {
            setError('Las direcciones de correo electrónico no coinciden.');
            return;
        }

        const db = getFirestore();

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
        }

        console.log('IDs de productos en orden.items:', orden.items.map(item => item.id));
        
        Promise.all(
            orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, 'item', productoOrden.id);
                const productoDoc = await getDoc(productoRef);
    
                if (productoDoc.exists()) {
                    const stockActual = productoDoc.data().stock;
    
                    await updateDoc(productoRef, {
                        stock: stockActual - productoOrden.cantidad
                    });
                } else {
                    console.error('El documento del producto no existe');
                    console.log('ID del producto que no existe:', productoOrden.id);
                }
            })
        )

        .then(() => {
            addDoc(collection(db,'ordenes'),orden)
            .then((docRef) => {
                setError('')
                setOrdenId(docRef.id)
                vaciarCarrito()
            })
            .catch((error) => {
                console.log(error)
                setError('Se produjo un error al crear la orden')
            })
        })
        .catch((error) => {
            console.log(error)
            setError('No es posible actualizar el stock')
        })

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