import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'
import './card.css'

function Card({children, imgLoc, desc}) {
  const [{theme}] = useContext(ThemeContext)
  return (
    <>
      <div className="card2" style={{backgroundColor: theme.navFootColor}}>
        <div className="logo" >
          <img src={imgLoc} style={{border: `2px solid ${theme.color}`}} />
        </div>
        <p style={{color: theme.color}}>{desc}</p>
        {children}
      </div>
    </>
  )
}


export default Card