import React, {useState, useContext} from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import './itemDetail.css'


const ItemDetail = ({ producto }) => {

    const [cart, setCart] = useState(false)

    const {agregarCarrito} = useContext(CartContext)

    const onAdd = (count) =>{

        setCart(true)

        agregarCarrito(producto,count)
    }

    return (
            <div key={producto.id} className='detalle'>
                <img src={producto.img} alt={producto.nombre} />
                <h2>{producto.nombre}</h2>
                <h2>Precio: {producto.precio}</h2>
                <h2>Stock: {producto.stock}</h2>
                <p>{producto.descripcion}</p>

                {cart ? <Link to={'/cart'} className='detailbtn'>Ir al carrito</Link> : <ItemCount initial= {1} stock={producto.stock} onAdd={onAdd} style={{ color: 'red', fontSize: '16px' }}/>}
            </div>
    )
}

export default ItemDetail