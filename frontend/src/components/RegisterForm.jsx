import React, { useState } from 'react'
import './Form.css'
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import Error from './Error'


function RegisterForm() {
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
      const data = await axios.post('http://localhost:8000/api/users', {
        name: values.name,
        email: values.email,
        password: values.pass1,
      })
      console.log(data)
    } catch (error) {
      console.log(error.response.data.message)
      setErrorMsg(error.response.data.message)
    }
  }

  const loginResponseGoogle = (response) => {
    console.log(response)
  }

  return (
    <>
      {errorMsg ? <Error color='rgb(255, 93, 126)'>{errorMsg}</Error>: null}
      <div className='form-page'>
        <div className="form-wrapper">
          
          <form onSubmit={submitFunc} className="formRegister" >
            <h1>Register</h1>
            <input className='inFields' type="text" id="name"  placeholder='Enter Your Full Name' autoComplete='off' onChange={(e) => {setValues({...values, name: e.target.value})}} />
            <input className='inFields' type="email" id="email"  placeholder='Enter Your Email Address' autoComplete='off' onChange={(e) => {setValues({...values, email: e.target.value})}}/>
            <input className='inFields' type="password" id="pass" placeholder='Enter Password' onChange={(e) => {setValues({...values, pass1: e.target.value})}}/>
            <input className='inFields' type="password" id="pass2" placeholder='Confrim your Password' onChange={(e) => {setValues({...values, pass2: e.target.value})}}/>
            <button type="submit">Submit</button>
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

export default RegisterForm