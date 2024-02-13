import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'

const Item = ({ producto }) => {
  return (
    <Link to={`/detalle/${producto.id}`}>
      <div key={producto.id} className='container'>
        <img src={producto.img} alt={producto.nombre} />
        <h3>{producto.nombre}</h3>
      </div>
    </Link>
  )
}

export default Item