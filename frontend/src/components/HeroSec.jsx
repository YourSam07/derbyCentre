import React ,{ useContext }from 'react'
import "./heroSec.css"
import Button from "./Button";
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/userContext'

function HeroSec() {
  const [{currentUser}] = useContext(UserContext)
  const navigate = useNavigate()
  const funcBookNow = () =>{
    if (currentUser.isloggedin){
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