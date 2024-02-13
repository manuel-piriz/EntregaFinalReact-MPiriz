import { useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/productos.json");
                const data = await response.json()
                const producto = data.find(producto => producto.id == id)
                setProducto(producto)
            } catch (error) {
                console.log("Error en fetch" + error)
            }
        }

        fetchData();
    }, [id])

    return (
        <div>
            {producto.length == 0
                ?
                <h2>cargando producto...</h2>
                :
                <ItemDetail producto={producto} />
            }
        </div>
    )
}

export default ItemDetailContainer