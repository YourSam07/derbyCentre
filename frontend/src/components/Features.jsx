import React, { useContext } from 'react'
import './Features.css'
import { ThemeContext } from '../contexts/theme'


function Features() {
  const [{theme}] = useContext(ThemeContext)
  return (
    <>
        <div className="featureSec" style={{backgroundColor: theme.backgroundColor, color: theme.color}}>
            <div className="featureWrapper">
                <div className="left">
                    <img src="../Assets/drawing.png" alt="" />
                </div>
            </div>
        </div>
    </>

  )
}

export default Features