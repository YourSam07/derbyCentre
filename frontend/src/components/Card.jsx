import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'
import './card.css'

function Card({children}) {
  const [{theme}] = useContext(ThemeContext)
  return (
    <>
      <div className="card" style={{backgroundColor: theme.navFootColor}}>
        {children}
      </div>
    </>
  )
}


export default Card