import React, { useState, useContext } from 'react'
import './Form.css'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import Error from './Error';
import { ThemeContext } from '../contexts/theme';
import { UserContext } from '../contexts/userContext';
import { Link, useLocation, useNavigate } from 'react-router-dom'

function LoginForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const [{theme}] = useContext(ThemeContext)
  const [{setCurrentUser}] = useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState(null)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const logInfunc = async(e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:8000/api/users/login', credentials)
      setErrorMsg(null)
      navigate('/bookings')
      setCurrentUser({name: data.data.name, isloggedin: true})
    } catch (error) {
      setErrorMsg(error.response.data.message)
    }
  }

  const loginResponseGoogle = async (response) => {    
    console.log(response)
    try{
        const data = await axios.post('http://localhost:8000/api/users/login', {
        email: response.profileObj.email,
        password: response.profileObj.googleId,
      })
      console.log(data)
      setErrorMsg(null)
      navigate('/bookings')
      setCurrentUser({name: response.profileObj.name, token: data.data.token, isloggedin: true})
    } catch (error) {
      setErrorMsg(error)
    }
  }

  return (
    <>
    {location.state?.isRegistered ? <Error color='rgb(165, 255, 69)'>You have succefully registered, You can login Now!</Error> : null}
    {errorMsg ? <Error color='rgb(255, 93, 126)'>{errorMsg}</Error> : null}
    <div className='form-page' style={{backgroundColor: theme.backgroundColor}}>
      <div className="form-wrapper" style={{backgroundImage: theme.formColor}}>
        
        <form onSubmit={logInfunc} className="formRegister">
          <h1 style={{color: theme.color}}>Sign In</h1>
          <input className='inFields' type="text" name="" id="" placeholder='Enter Your Email Address' onChange={(e) => setCredentials({...credentials, email: e.target.value})}/>
          <input className='inFields' type="password" name="" id="" placeholder='Enter Password' onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
          <button type="submit">Log In</button>
        </form>
        
        <div className="divider" style={{borderBottom: `1px solid ${theme.color}`}}>
            <span style={{backgroundColor: 'transparent', color: theme.color}}>or</span>
        </div>

        <GoogleLogin
          clientId="780502215129-j754hcv83ovmqh81uguakfu2kc244os1.apps.googleusercontent.com"
          render={renderProps => (
              <button className="googleBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <span><FcGoogle /></span>
                Conitnue with Google
              </button>
          )}
          buttonText="Login"
          onSuccess={loginResponseGoogle}
          onFailure={loginResponseGoogle}
          cookiePolicy={'single_host_origin'}
        />

        <div className="lineInForm" style={{backgroundColor: theme.color}}></div>

        <div className="goto" style={{color: theme.color}}>
            Don’t have an account? 
            <Link to='/register'><span> Register Now</span></Link>
        </div>


      </div>
          
    </div>
  </>
  )
}

export default LoginForm