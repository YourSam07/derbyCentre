import React, { useState } from 'react'
import './Form.css'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import Error from './Error';

function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const logInfunc = async(e) => {
    e.preventDefault();
    
    try {
      const data = await axios.post('http://localhost:8000/api/users/login', credentials)
      setIsLoggedIn(true)
      setErrorMsg(null)
      setSuccessMsg('You have succesfully Loggrd In')
      console.log(data)
    } catch (error) {
      console.log(error.response)
      setSuccessMsg(null)
      setErrorMsg(error.response.data.message)
    }
  }

  const loginResponseGoogle = (response) => {
    console.log(response)
  }

  return (
    <>
    {errorMsg ? <Error color='rgb(255, 93, 126)'>{errorMsg}</Error> : null}
    {successMsg ? <Error color='rgb(165, 255, 69)'>{successMsg}</Error> : null}
    <div className='form-page'>
      <div className="form-wrapper">
        
        <form onSubmit={logInfunc} className="formRegister">
          <h1>Sign In</h1>
          <input className='inFields' type="text" name="" id="" placeholder='Enter Your Email Address' onChange={(e) => setCredentials({...credentials, email: e.target.value})}/>
          <input className='inFields' type="password" name="" id="" placeholder='Enter Password' onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
          <button type="submit">Log In</button>
        </form>
        
        <div className="divider">
            <span>or</span>
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


      </div>
          
    </div>
  </>
  )
}

export default LoginForm