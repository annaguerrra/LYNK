import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Discipline } from './Pages/Discipline'
import { Class } from './Pages/Class'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Disciplines" element={<Discipline/>}></Route>
          {/* <Route path="/Content" element={<Content/>}></Route> */}
          <Route path="/Class/{id}" element={<Class/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
