import './App.css';
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import { useState } from 'react';

import Login from './components/account/Login';
import Home from './components/Home/Home';
import Navbar from './components/account/Navbar';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DeatailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';

const PrivateRoute = ({ isAuthenticated}) => {
  return isAuthenticated ? (
    <>
      <Navbar/>
      <Outlet/>
    </>
  ) : (
    
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <div style={{marginTop: 64}} className="App">
        <Routes>

          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />}  />

          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path="/home" element={<Home/>} />
          </Route>

          <Route path='/home' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path="/home" element={<Home/>} />
          </Route>

          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/create' element={<CreatePost />} />
          </Route>

          <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

          <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/about' element={<About />} />
          </Route>

          <Route path='/Contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
            <Route path='/Contact' element={<Contact />} />
          </Route>
          
        </Routes>
        
      </div>
    </BrowserRouter> 
  );
}

export default App;
