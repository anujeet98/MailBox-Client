// import React from 'react';
import Authentication from './components/Authentication/Authentication';
import { Route, Routes } from 'react-router-dom';
import Mailbox from './components/Mailbox/Mailbox';
import Compose from './components/Compose/Compose';
import Home from './components/Layout/Home';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authWithTokenThunk } from './store/authSlice';
interface AuthRes {
  email: string,
  idToken: string,
  expiresIn: string,
}
interface AuthState {
  auth: {
      isLoggedIn: boolean,
      userData: null | AuthRes,
      token: string | null,
  }
}

function App() {
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch<any>();
  const isLoggedIn = useSelector((state:AuthState)=>state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      if(location.pathname !== '/auth'){
        (async()=>{
            const token = localStorage.getItem('mailclienttoken');
            if(token){
                try{
                    await dispatch(authWithTokenThunk(token));
                }
                catch(err: any){
                    alert(`Error-${err.response.data.message}. \nRedirecting to login page...`);
                    navigate('/auth');
                }
            }
            else{
                alert('Error-INVALID_ID_TOKEN.\n Kindly sign-in again. Redirecting to sign-in page.. ');
                navigate('/auth');
            }
            setLoading(false);
        })()
      }
      else
        setLoading(false);
  },[]);
  
  if (loading) {
      return <div className='container-fluid d-flex justify-content-center '>Loading...</div>;
  }
  return (
    <Routes>
        <Route path='/home/*' element={isLoggedIn ? <Home/> : <Authentication/>} />
        <Route path='/auth' element={<Authentication/>} />
    </Routes>
  );
}

export default App;
