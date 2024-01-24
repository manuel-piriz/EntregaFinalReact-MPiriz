import './App.css'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import NavBar from './componentes/NavBar/NavBar'


function App() {

  return (
    <>
      <NavBar/>
      <ItemListContainer greeting={"Bienvenidos a Todo Oficina"}/>
    </>
  )
}

export default App
