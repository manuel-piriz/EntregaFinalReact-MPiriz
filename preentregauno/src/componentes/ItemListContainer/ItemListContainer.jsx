import React, { useState, useEffect } from 'react'
import './itemListContainer.css'
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const ItemListContainer = ({ greeting }) => {
    const [productos, setProductos] = useState([]);

    const {categoryId} = useParams()

    useEffect(() => {

        const db = getFirestore()

        const misProductos = 
        categoryId ?
        query(collection(db,"productos"), where("categoria","==",categoryId))
        :
        collection(db,"productos")

        getDocs(misProductos)
        .then(res => {
            const nuevosProductos = res.docs.map(doc => {
                const data = doc.data()
                return {id: doc.id,...data}
            })
            setProductos(nuevosProductos)
        })
        .catch((error) => console.log(error))

    }, [categoryId])

    return (
        <div className='itemListContainer'>
            <p>{greeting}</p>

            {productos.length === 0
                ?
                <h2>cargando productos...</h2>
                :
                <ItemList productos={productos} />
            }
        </div>
    )
}

export default ItemListContainer