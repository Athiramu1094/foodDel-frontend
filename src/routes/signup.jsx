import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { setUserLoggedIn } from '../features/login/loginSlice';
import { useDispatch } from 'react-redux';
import "./signup.css"

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [name,setName] = useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]= useState('')

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    function handleSignup(event){
        event.preventDefault()

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
        
        const data = {
            name:name,
            email:email,
            password:password
        }
    
        axios.post(`http://localhost:3000/api/create`, data, {withCredentials:true})
        .then(response => {
            console.log(response);
            dispatch(setUserLoggedIn(true))
            navigate("/");
        })
        .catch(error => {
            console.log(error);
            const errorMessage = error.response?.data?.message;
    
            if (errorMessage === "User already exists") {
                setGeneralError(errorMessage);
            } else if (errorMessage === "Please enter a valid email") {
                setEmailError(errorMessage);
            } else if (errorMessage === "Password must be at least 8 characters long") {
                setPasswordError(errorMessage);
            } else {
                setGeneralError('Signup failed. Please try again.');
            }
        });
    }    
    return (
<main className='container'>
<div className='signup-container'>
    <section className='signup-card'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
            <label htmlFor="name">Name</label>
            <input onChange={(event)=>setName(event.target.value)} type="text" id='name' />
            <label htmlFor="email">E-mail</label>
            <input onChange={(event)=>setEmail(event.target.value)} type="email" id='email'/>
            {emailError && <p className='error-message'>{emailError}</p>} 
            <label htmlFor="password">Password</label>
            <input onChange={(event)=>setPassword(event.target.value)} type="password" id='password' />
            {passwordError && <p className='error-message'>{passwordError}</p>}
            <button>Sign Up</button>
        </form>
        {generalError && <p className='error-message'>{generalError}</p>}
        <p> Already have an account? <Link className='link' to="/login">Log in</Link></p>
    </section>
    </div>
    <div>
        <Link className='bottom-arrow' to="/">  <span className="material-symbols-outlined">
arrow_circle_left
</span></Link>
  
    </div>
    
</main>
    
)
}

export default Signup
