import React, { useState, useContext } from 'react'
import './Form.css'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import Error from './Error'
import { ThemeContext } from '../contexts/theme';
import { Link, useNavigate } from 'react-router-dom'

function RegisterForm() {
  const navigate = useNavigate();

  const [{theme}] = useContext(ThemeContext)
  const [errorMsg, setErrorMsg] = useState(null)
  const [values, setValues] = useState({
    name: '',
    email: '',
    pass1: '',
    pass2: ''
  })

  const submitFunc = async(e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
        await axios.post('http://localhost:8000/api/users', {
        name: values.name,
        email: values.email,
        password: values.pass1,
      })
      navigate('/signin', {state: {isRegistered: true}})
    } catch (error) {
      console.log(error.response.data.message)
      setErrorMsg(error.response.data.message)
    }
  }

  const registerResponseGoogle = async (response) => {
    console.log(response)
    try {
        await axios.post('http://localhost:8000/api/users', {
        name: response.profileObj.name,
        email: response.profileObj.email,
        password: response.accessToken
      })
      navigate('/signin', {state: {isRegistered: true}})
    } catch (error) {
      console.log(error)
      setErrorMsg(error.response.data.message)
    }
  }

  return (
    <>
      {errorMsg ? <Error color='rgb(255, 93, 126)'>{errorMsg}</Error>: null}
      <div className='form-page' style={{backgroundColor: theme.backgroundColor}}>
        <div className="form-wrapper" style={{backgroundImage: theme.formColor}}>
          
          <form onSubmit={submitFunc} className="formRegister" >
            <h1 style={{color: theme.color}}>Register</h1>
            <input className='inFields' type="text" id="name"  placeholder='Enter Your Full Name' autoComplete='off' onChange={(e) => {setValues({...values, name: e.target.value})}} />
            <input className='inFields' type="email" id="email"  placeholder='Enter Your Email Address' autoComplete='off' onChange={(e) => {setValues({...values, email: e.target.value})}}/>
            <input className='inFields' type="password" id="pass" placeholder='Enter Password' onChange={(e) => {setValues({...values, pass1: e.target.value})}}/>
            <input className='inFields' type="password" id="pass2" placeholder='Confrim your Password' onChange={(e) => {setValues({...values, pass2: e.target.value})}}/>
            <button type="submit">Submit</button>
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
            onSuccess={registerResponseGoogle}
            onFailure={registerResponseGoogle}
            cookiePolicy={'single_host_origin'}
          />

          <div className="lineInForm" style={{backgroundColor: theme.color}}></div>

          <div className="goto" style={{color: theme.color}}>
              Already have an account? 
              <Link to='/signin'><span> Login</span></Link>
          </div>


        </div>
            
      </div>
    </>
  )
}

export default RegisterForm