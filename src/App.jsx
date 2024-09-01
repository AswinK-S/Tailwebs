import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path ='/register' element={<SignUp/>} />
          <Route path ='/home' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
