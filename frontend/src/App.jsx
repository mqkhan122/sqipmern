import React from 'react';
import Nav from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import Adminlogin from './Components/Adminlogin';
import Adminpage from './Components/Adminpage';

const App = () => {
  const location = useLocation();
  const hideLayout = location.pathname === '/admin' || location.pathname === '/adminpage';

  return (
    <>
      {!hideLayout && <Nav />}

      <Routes>
        <Route index element={<Main />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/adminpage" element={<Adminpage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
