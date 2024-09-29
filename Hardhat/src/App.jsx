import { Route, Routes } from 'react-router-dom'
import AdminPrivateRoute from './AdminPrivateRoute'
import './App.css'
import AdminHome from './pages/AdminHome'
import AdminLogin from './pages/AdminLogin'
import EventDetail from './pages/EventDetail'
import Index from './pages/Index'
import Unauthorized from './pages/Unauthorised'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import VoterHome from './pages/VoterHome'
import VoterPrivate from './VoterPrivate'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path="/register" element={<UserRegister />} />
        <Route path='/voter/login' element={<UserLogin/>}/>
        <Route path='/adminlogin' element={<AdminLogin/}/>
        <Route  element={<VoterPrivate/>}>
          <Route path='/voter/home' element={<VoterHome/>}/>
          <Route path='event/:id' element={<EventDetail/>}/>
        </Route>
        <Route element={<AdminPrivateRoute/>}>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='/create-event'>Create Events</Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />



      </Routes>
    </>
  )
}

export default App
