import './app.css'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import NavBar from './componentes/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './componentes/Error/Error'
import Cart from './componentes/Cart/Cart'
import CartProvider from './Context/CartContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />

            <Route path='/categoria/:categoryId' element={<ItemListContainer />} />

            <Route path='/detalle/:id' element={<ItemDetailContainer />} />

            <Route path='/cart' element={<Cart />} />

            <Route path='*' element={<Error />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
