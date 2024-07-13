import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/Signup'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
