import './app.css'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import NavBar from './componentes/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './componentes/Error/Error'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ItemListContainer greeting={"Bienvenidos a Todo Oficina"} />} />
          <Route path='/categoria/:id' element={<ItemListContainer/>}/>
          <Route path='/detalle/:id' element={<ItemDetailContainer/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
