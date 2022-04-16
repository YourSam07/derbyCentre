import React from 'react'
import "./heroSec.css"
import Button from "./Button";
import { useLocation, useNavigate } from 'react-router-dom'

function HeroSec() {
  const location = useLocation()
  const navigate = useNavigate()
  const funcBookNow = () =>{
    const isloggedin = localStorage.getItem('')
    console.log(location.state.isLoggedIn)
    if (location.state?.isLoggedIn){
      navigate('/bookings')
    } else {
      navigate('/signin')
    }
  }
  return (
    <>
      <div className="hero">
        <video src="../Assets/video.mp4" autoPlay loop muted/>
        <div className="overVid">
          <h1>Book and Play</h1>
          <p>What are you waiting for?</p>
          <Button btnStyle="btn--outline" size="btn--large" onclick={funcBookNow}>Book Now</Button>
        </div>
        
      </div>
      
    </>
  )
}

export default HeroSec