import './App.css'
import {BrowserRouter , Route,Routes} from 'react-router-dom'
import Hone from './assets/Hone'

function App() {
 

  return (
    <>     
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Hone/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
