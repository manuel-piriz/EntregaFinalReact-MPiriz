import React from 'react'
import ItemCount from '../ItemCount/ItemCount'
import './itemDetail.css'

const ItemDetail = ({ producto }) => {
    return (
            <div key={producto.id} className='detalle'>
                <img src={producto.img} alt={producto.nombre} />
                <h2>{producto.nombre}</h2>
                <h2>Precio: {producto.precio}</h2>
                <h2>Stock: {producto.stock}</h2>
                <p>{producto.descripcion}</p>

                <ItemCount initial= {1} stock={producto.stock}/>
            </div>
    )
}

export default ItemDetail