import React, { useContext } from 'react'
import './Features.css'
import { ThemeContext } from '../contexts/theme'
import {GiSoccerBall, GiWaterBottle} from 'react-icons/gi'
import {FaRegLightbulb, FaPeopleArrows} from 'react-icons/fa'


function Features() {
  const [{theme}] = useContext(ThemeContext)
  return (
    <>
        <div className="featureSec" style={{backgroundColor: theme.backgroundColor, color: theme.color}}>
          <div className="featureWrapper">
            <div className="left">
              <div className="card" style={{backgroundImage: `linear-gradient(45deg, ${theme.accent}, ${theme.accent2}`}}> 
                <GiSoccerBall size='2.5rem'/>
                <h1>No Football, No Problem</h1>
                <p>we have got you covered from football to bibs and evrything else you need to havve a good game!</p>
              </div>

              <div className="card" style={{backgroundImage: `linear-gradient(45deg, ${theme.accent}, ${theme.accent2}`}}>
                <GiWaterBottle size='2.5rem'/>
                <h1>Forgot your water bottle</h1>
                <p>No problem, water cooler is at your service!</p>
              </div>
            </div>
            <div className="middle">
              <img src="../Assets/drawing.png" alt="" />
            </div>
            <div className="right">
              <div className="card" style={{backgroundImage: `linear-gradient(45deg, ${theme.accent}, ${theme.accent2}`}}>
                <FaRegLightbulb size='2.5rem'/>
                <h1>Tired of playing in dim lit grounds</h1>
                <p>Book a game here and play under Flood Lights</p>
              </div>

              <div className="card" style={{backgroundImage: `linear-gradient(45deg, ${theme.accent}, ${theme.accent2}`}}>
                <FaPeopleArrows size='2.5rem'/>
                <h1>Want to test your Team</h1>
                <p>Book a Game and play against experienced teams!</p>
              </div>
            </div>
          </div>
        </div>
    </>

  )
}

export default Features