import React from 'react'
import {BrowserRouter,Route,Routes}  from 'react-router-dom'
import Home from './Screens/Home'
import Start from './Screens/Start'
import Register from './Screens/Register'
import Password from './Screens/Password'
import Login from './Screens/Login'
import Dashboard from './Screens/Dashboard'


import Chatbot from './Screens/Chatbot'
import Cause from './Screens/Cause'

import GetStarted from './Screens/Organisations/GetStarted'
import OrgStart from './Screens/Organisations/OrgStart'
import SignUpNgo from './Screens/Organisations/SignUpNgo'
import LoginNgo from './Screens/Organisations/LoginNgo'
import OrgDashBoard from './Screens/Organisations/OrgDashBoard'
import NgoReg from './Screens/Organisations/NgoReg'
import About from './Screens/About'
import Contact from './Screens/Contact'



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

      <Route path ="/chatbot" element ={<Chatbot/>} />
      <Route path ="/cause" element ={<Cause/>} />
      <Route path ="/about" element ={<About/>} />
      <Route path = '/contact' element ={<Contact/>} />



      <Route path ='/organisations'  element={<OrgStart/>}/>
      <Route path ='/organisations/getStarted'  element={<GetStarted/>}/>
      <Route path ='/organisations/signup'  element={<SignUpNgo/>}/>
      <Route path ='/organisations/registration/:orgId'  element={<NgoReg/>}/>
      <Route path ='/organisations/login'  element={<LoginNgo/>}/>
      <Route path ='/organisations/dashboard/:userId'  element={<OrgDashBoard/>}/>

    </Routes>
    </BrowserRouter>
    </>

    
  )
}

export default App