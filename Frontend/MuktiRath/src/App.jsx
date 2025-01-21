import React from 'react'
import {BrowserRouter,Route,Routes}  from 'react-router-dom'
import Home from './Screens/Home'
import Start from './Screens/Start'
import Register from './Screens/Register'
import Password from './Screens/Password'
import Login from './Screens/Login'
import Dashboard from './Screens/Dashboard'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={
        <Home/>
      }/>
      <Route path="/start" element={<Start/>} />
      <Route path ="/signup" element ={<Register/>} />
      <Route path ="/setPassword/:userId" element ={<Password/>} />
      <Route path ="/login" element ={<Login/>} />
      <Route path ="/dashboard/:userId" element ={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    </>

    
  )
}

export default App