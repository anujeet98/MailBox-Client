// import React from 'react';
import Authentication from './components/Authentication/Authentication';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Authentication/>} />
        <Route path='/home' element={<Authentication/>} />
    </Routes>
  );
}

export default App;
