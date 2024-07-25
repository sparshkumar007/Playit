import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/Signup'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import SpotifyHome from './pages/spotify/SpotifyHome'
import AuthenticateSpotify from './pages/spotify/AuthenticateSpotify'
import Navbar from './components/navbar/Navbar'
import SpotifyCallback from './pages/spotify/SpotifyCallback'
import SpotifyPlaylists from './pages/spotify/SpotifyPlaylists'
import SpotifySongs from './pages/spotify/SpotifySongs'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/spotify" element={<SpotifyHome />}></Route>
        <Route path="/spotifycallback" element={<SpotifyCallback />}></Route>
        <Route path="/spotifyAuth" element={<AuthenticateSpotify />}></Route>
        <Route path="/spotifyPlaylists" element={<SpotifyPlaylists />}></Route>
        <Route path="/spotifyPlaylists" element={<SpotifyPlaylists />}></Route>
        <Route path="/spotifySongs" element={<SpotifySongs />}></Route>
      </Routes >
      <ToastContainer />
    </>
  )
}

export default App
