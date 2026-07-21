import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Discipline } from './Pages/Discipline'
import { Class } from './Pages/Class'
import { Content } from './Pages/Content'
import { ModalProvider } from './Providers/modalContext'
import { ErrorPage } from './Pages/ErrorPage'
import { History } from './Pages/History'
import { Profile } from './Pages/Profile'

function App() {

  return (
    <>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Disciplines" element={<Discipline />} />
            <Route path="/Content" element={<Content />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Class" element={<Class />} />
            <Route path="/History" element={<History />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/erro" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </>
  )
}

export default App
