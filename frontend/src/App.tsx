import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Discipline } from './Pages/Discipline'
import { Class } from './Pages/Class'
import { Content } from './Pages/Content'
import { ErrorPage } from './Pages/ErrorPage'
import { History } from './Pages/History'
import { AuthProvider } from './Contexts/AuthContext'
import { PrivateRoute } from './Contexts/PrivateRoute'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Disciplines" element={
                <Discipline />
            } />
            <Route path="/Content" element={
                <Content />
            } />
            <Route path="/Class/:class_id" element={
                <Class />
            } />
            <Route path="/History" element={
                <History />
            } />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/erro" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App

// <Route path="/Disciplines" element={
//   <PrivateRoute>
//     <Discipline />
//   </PrivateRoute>
// } />
// <Route path="/Content" element={
//   <PrivateRoute>
//     <Content />
//   </PrivateRoute>
// } />
// <Route path="/Class" element={
//   <PrivateRoute>
//     <Class />
//   </PrivateRoute>
// } />
// <Route path="/History" element={
//   <PrivateRoute>
//     <History />
//   </PrivateRoute>
// } />
