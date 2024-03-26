// import React from 'react';
import Authentication from './components/Authentication/Authentication';
import { Route, Routes } from 'react-router-dom';
import Mailbox from './components/Mailbox/Mailbox';
import Compose from './components/Compose/Compose';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Authentication/>} />
        <Route path='/home' element={<Compose/>} />
    </Routes>
  );
}

export default App;
