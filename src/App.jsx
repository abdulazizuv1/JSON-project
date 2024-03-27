import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Create from './pages/create/Create';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [mode, setMode]=useState(false)
  const changeMode = ()=>{
    setMode(!mode)
  }
  return (
    <div className={mode ? "body night":"body"}>
      <ToastContainer/>
      <BrowserRouter>
        <Navbar changeMode={changeMode}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about/:id' element={<About/>}/>
          <Route path='/create' element={<Create/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
