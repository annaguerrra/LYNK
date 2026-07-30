import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Discipline } from './Pages/Discipline'
import { Class } from './Pages/Class'
import { Content } from './Pages/Content'
import { ErrorPage } from './Pages/ErrorPage'
import { History } from './Pages/History'
import { AuthProvider } from './Contexts/AuthContext'
import { PrivateRoute } from './Contexts/PrivateRoute'
import { Navigate } from "react-router-dom";

function App() {

  return (
    <>
        <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Disciplines" element={
              <PrivateRoute>
                <Discipline />
              </PrivateRoute>
            } />
            <Route path="/Content/:discipline_id" element={
              <PrivateRoute>
                <Content />
              </PrivateRoute>
            } />
            <Route path="/Class/:class_id" element={
              <PrivateRoute>
                <Class />
              </PrivateRoute>
            } />
            <Route path="/History" element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            } />
            <Route
              path="*"
              element={
                  <Navigate
                      to="/erro"
                      state={{ errorText: "Página não encontrada" }}
                      replace
                  />
              }
          />
            <Route path="/erro" element={<ErrorPage />} />
          </Routes>
      </AuthProvider>
        </BrowserRouter>
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
