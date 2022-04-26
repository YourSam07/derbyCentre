import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'
import Card from './Card'

function ReviewsSec() {
  const [{theme}] = useContext(ThemeContext)
  return (
    <>
        <div className="reviewSec" style={{backgroudColor: theme.backgroundColor}}>
            <Card />
        </div>
    </>
  )
}

export default ReviewsSec