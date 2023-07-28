import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import "./index.css";
import Login from "./pages/Login";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navigation from './components/Navigation';
import { useAuth } from './HOOKS/useAuth';
import ProtectedRoutes from './components/ProtectedRoutes';
import Unauthorized from './pages/Unauthorized';

const App = () => {
  const { auth } = useAuth();
  
  return (
    <div className='App'>
      <Router>
        <Navigation />
        <Routes>
        <Route element={<ProtectedRoutes allowedRoles={["1", "2"]} />}>
          <Route path='/home' element={<Home />} />
        </Route>  
        <Route element={<ProtectedRoutes allowedRoles={["1"]} />}>
          <Route path='/about' element={<About />} />
        </Route>  
        <Route element={<ProtectedRoutes allowedRoles={["2"]} />}>
          <Route path='/contact' element={<Contact />} />
        </Route>  

          <Route path='/login' element={<Login />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
