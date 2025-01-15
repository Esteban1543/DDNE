import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';


//🔸 Verificación de Sesión en LocalStorage para Protección de Rutas
const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!sessionStorage.getItem('user_session');
    return isAuthenticated ? element : <Navigate to="/" />;
};

const PrivateLogin = ({ element }) => {
    const isAuthenticated = !!sessionStorage.getItem('user_session');
    return !isAuthenticated ? element : <Navigate to="/Dashboard" />;
};


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<PrivateLogin
                        element={<Login />}
                    />}
                />

                <Route
                    path="/Dashboard"
                    element={<PrivateRoute
                        element={<Dashboard />}
                    />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;