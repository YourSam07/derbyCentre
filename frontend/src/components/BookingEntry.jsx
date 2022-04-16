import React , {useContext} from 'react'
import { ThemeContext } from '../contexts/theme'
import './BookingEntry.css'

function BookingEntry({serialNum, name, start, end, errbgcolor}) {
  const [{theme}] =  useContext(ThemeContext)
  return (
    <>
        <div className="entryContainer" style={{border: `2px solid ${theme.color}`, background: `${errbgcolor}`}}>
            <div className="snum" style={{borderRight: `2px solid ${theme.color}`}}>{serialNum}</div>
            <div className="Bookingname" style={{borderRight: `2px solid ${theme.color}`}}>{name}</div>
            <div className="stime" style={{borderRight: `2px solid ${theme.color}`}}>{start}</div>
            <div className="etime">{end}</div>
        </div>
    </>
  )
}

export default BookingEntry