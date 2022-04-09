import React from 'react'
import "./heroSec.css"
import Button from "./Button";

function HeroSec() {
  return (
    <>
      <div className="hero">
        <video src="../Assets/video.mp4" autoPlay loop muted/>
        <div className="overVid">
          <h1>Book and Play</h1>
          <p>What are you waiting for?</p>
          <Button btnStyle="btn--outline" size="btn--large">Book Now</Button>
        </div>
        
      </div>
      
    </>
  )
}

export default HeroSec