import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,  useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../features/login/loginSlice';
import axios from 'axios';
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    const redirectPath = new URLSearchParams(location.search).get('redirect');

    const handleLogin = (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
        setGeneralError('');

        const data = { email, password };

        axios.post(`http://localhost:3000/api/login`, data, {withCredentials:true})
            .then(response => {
                
                dispatch(setUserLoggedIn(true))
                if (redirectPath) {
                    navigate(redirectPath);
                } else {
                    navigate('/');}
                
            
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.log(error);
                const errorMessage = error.response?.data?.message;

                if (errorMessage === "User does not exist") {
                    setEmailError("User does not exist");
                } else if (errorMessage === "Invalid password") {
                    setPasswordError("Invalid password");
                } else {
                    setGeneralError('Login failed. Please try again.');
                }
            });
    }

    return (
        <main className='container'>
            <div className='login-container'>
                <section className='login-card'>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">E-mail</label>
                        <input 
                            onChange={(event) => setEmail(event.target.value)} 
                            value={email} 
                            type="email" 
                            id='email' 
                        />
                        {emailError && <p className='error-message'>{emailError}</p>}
                        
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={(event) => setPassword(event.target.value)} 
                            value={password} 
                            type="password" 
                            id='password' 
                        />
                        {passwordError && <p className='error-message'>{passwordError}</p>}
                        
                        <button type="submit">Login</button>
                    </form>
                    {generalError && <p className='error-message'>{generalError}</p>}
                    <p>New to Foodiko? <Link className='link' to="/signup">Create account</Link></p>
                </section>
            </div>
            <div>
                <Link className='bottom-arrow' to="/">
                    <span className="material-symbols-outlined">arrow_circle_left</span>
                </Link>
            </div>
        </main>
    );
}

export default Login;
