import {Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Register from '../src/pages/Register'
import Login from '../src/pages/Login'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'
import NewTemplate from './pages/Template/NewTemplate'
import ViewTemplate from './pages/Template/ViewTemplate'
import NewProject from './pages/Project/NewProject'
import ViewProject from './pages/Project/VIewProject'
import { TableContext, TableContextProvider } from '../context/tableContext'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <TableContextProvider>
      <Navbar/>
      <Toaster toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/newtemplate' element={<NewTemplate/>}/>
        <Route path='/viewtemplate' element={<ViewTemplate/>}/>
          <Route path='/newproject' element={<NewProject/>}/>
          <Route path='/viewproject' element={<ViewProject/>}/>
      </Routes>
      </TableContextProvider>
    </UserContextProvider>
  )
}

export default App
