import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Discipline } from './Pages/Discipline'
import { Class } from './Pages/Class'
import { Content } from './Pages/Content'
import { ErrorPage } from './Pages/ErrorPage'
import { History } from './Pages/History'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Disciplines" element={<Discipline />} />
            <Route path="/Content" element={<Content />} />
            <Route path="/Class" element={<Class />} />
            <Route path="/History" element={<History />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/erro" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
