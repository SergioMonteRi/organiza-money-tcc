import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// PAGES
import Home from 'pages/home';
import Login from 'pages/login';
import Redirect from 'pages/redirect';
import Dashboard from 'pages/dashboard';
import UserRegister from 'pages/user-register';

// AUTH
import { AuthContext, AuthContextData } from 'contex/AuthContex';

// STYLES
import 'assets/styles/custom.scss';
import './App.css';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="*" element={<Redirect />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
