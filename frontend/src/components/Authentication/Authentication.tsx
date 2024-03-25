import { FormEvent, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, Form} from "react-bootstrap";
import classes from './Authentication.module.css';
import { NavLink, useNavigate } from "react-router-dom";
import { authThunk } from "../../store/authSlice";
import { useSelector } from "react-redux";

const validateForm = (email:string, password:string, confirmPassword:string, isSignIn:boolean) => {
    if(email.trim()==='' || !/\S+@\S+\.\S+/.test(email)){
        alert('Please enter a valid email.');
        return false;
    }
    if(password.trim()==='' || password.length<6){
        alert('Please enter a valid password. Password must be non-empty and minimum 6 characters long.');
        return false;
    }
    if(!isSignIn && password !== confirmPassword){
        alert('Password and Confirm-Password do not match.');
        return false;
    }
    return true;
}


const Authentication = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const cnfPasswordRef = useRef<HTMLInputElement>(null);
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>(); 
    const stateValue = useSelector(state => state);


    const AuthHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        const confirmPassword = !isSignIn ? (cnfPasswordRef.current?.value || '') : '';
        //if form not validated->alert shown->return
        if(!validateForm(email, password, confirmPassword, isSignIn))
            return;
    
        try{
            await dispatch(authThunk(isSignIn, {email: email, password: password}));
            alert(`${isSignIn ? 'User sign in successful' : 'User sign up successful'}`);
            emailRef.current && (emailRef.current.value = '');
            passwordRef.current && (passwordRef.current.value = '');
            if(!isSignIn) 
                cnfPasswordRef.current && (cnfPasswordRef.current.value='');
            navigate('/home');
        }
        catch(err: any){
            if(err)
                alert(err.message);
        }
    }
    return (
        <div className={classes.authContainer}>
            <Form onSubmit={(e)=>AuthHandler(e)} className={classes.auth + " shadow rounded-2 d-flex flex-column gap-2 border border-2 rounded-2  pt-4 pb-5 px-3 mb-4 "}>
                <span className="mb-4 fs-3 ">{isSignIn ? 'SignIn' : 'SignUp'}</span>
                <Form.Control type='email' placeholder='Email' ref={emailRef} required></Form.Control>
                <Form.Control type='password' placeholder='Password' ref={passwordRef} required></Form.Control>
                {!isSignIn && <Form.Control type='password' placeholder='Confirm Password' ref={cnfPasswordRef} required></Form.Control>}
                {isSignIn && <NavLink to='/password/forget'>forgot password</NavLink>}
                <Button type="submit" className="rounded-5 mt-3">{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
            </Form>
            <div className="btn border border-dark  ms-auto shadow p-2 rounded-2 bg-success-subtle " onClick={()=>setIsSignIn(!isSignIn)} style={{width: '20rem'}}>
                {isSignIn ? 'Don\'t have an account? Sign Up' : 'Have an account? Sign In'}
            </div>
        </div>
    )
}

export default Authentication;