import './App.css'
import UserDetails from './pages/UserDetails'
import UserTable from './pages/UserTable'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<UserTable/>}/>
      <Route path='/details/:id' element={<UserDetails/>}/>
     </Routes>
    </>
  )
}

export default App
