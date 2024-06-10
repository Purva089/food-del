// App.jsx
import React, { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import { AuthContext, AuthProvider } from './Context/AuthContext';

const AppContent = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="app-content">
            {isAuthenticated ? (
                <>
                    <Sidebar />
                    <Routes>
                        <Route path="/add" element={<Add />} />
                        <Route path="/list" element={<List />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <div className="app">
                <ToastContainer />
                <Navbar />
                <hr />
                <AppContent />
            </div>
        </AuthProvider>
    );
};

export default App;
