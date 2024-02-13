import React, { useState, useEffect } from 'react'
import './itemListContainer.css'
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';

const ItemListContainer = ({ greeting }) => {
    const [productos, setProductos] = useState([]);

    const {idCat} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("./productos.json");
                const data = await response.json()

                if(idCat){
                    const filtroCat = data.filter((p) => p.categoria == idCat)
                    setProductos(filtroCat)
                }else{
                    setProductos(data)
                }
            } catch (error) {
                console.log("Error en fetch" + error)
            }
        }

        fetchData()

    }, [])

    return (
        <div className='itemListContainer'>
            <p>{greeting}</p>

            {productos.length == 0
                ?
                <h2>cargando productos...</h2>
                :
                <ItemList productos={productos} />
            }
        </div>
    )
}

export default ItemListContainer