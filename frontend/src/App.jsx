import React from 'react';
import Nav from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import Adminlogin from './Components/Adminlogin';

import ProtectedRoute from './Components/ProtectedRoute';
import UserSign from './Components/UserSign';
import Adminpage from './Components/Adminpage';


const App = () => {
  const location = useLocation();
  const hideLayout = location.pathname === '/admin' || location.pathname === '/adminpage' || location.pathname === '/usersign';
  
  return (
    <>
      {!hideLayout && <Nav /> }

      <Routes>
        <Route index element={<Main />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/usersign" element={<UserSign />} />
        {/* <Route path="/adminpage" element={ <ProtectedRoute> <Adminpage /> </ProtectedRoute>} /> */}
        <Route path="/adminpage" element={
 
       <ProtectedRoute allowedRoles={["admin", "user"]}>
           <Adminpage />
       </ProtectedRoute>
      
    } />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );  
};

export default App;
