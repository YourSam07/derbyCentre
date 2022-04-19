import React, { useEffect, useContext, useState } from 'react'
import './DashboardBookEntry.css'
import axios from 'axios'
import { UserContext } from '../contexts/userContext'
import { ThemeContext } from '../contexts/theme'

function DashboardBookEntry() {
  const [{currentUser}] = useContext(UserContext)
  const [{theme}] = useContext(ThemeContext)
  const [userbookdata, setUserBookData] = useState([])
  console.log(currentUser.token)

  const todate = (date) => {
    const d = new Date(date)
    return d.toString().split(' ').slice(0, 4).join(' ')
  }

  const getData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${currentUser.token}` }
    }
    
    try {
        const bookingsOfaUser = await axios.get('http://localhost:8000/api/bookings', config)
        console.log(bookingsOfaUser.data)
        setUserBookData(bookingsOfaUser.data)
    } catch (error) {
        console.log(error)
    }
  }

  const changeTimings = async () => {
    try {
      await axios.put('')
    } catch (error) {
      
    }
  }

  const cancelBooking = async () => {
    try {
      axios.delete('')
    } catch (error) {
      
    }
  }

  useEffect(() => {
      if (currentUser.token){
        getData()
      }
    
  }, [currentUser.token])
  return (
    <>
        <div className="dashboardSec" style={{backgroundColor: theme.backgroundColor}}>
            <h1 style={{color: theme.color, marginBottom: '1.5rem'}}>Your Bookings</h1>
            {userbookdata.map((item) => {
                return <div className="cardBook">
                    <div className="date" style={{color: theme.color}}>{todate(item.date)}</div>
                    <div className="bookdetails">
                        <div className="heading" style={{color: theme.color}}>{item.bookingName}</div>
                        <div className="stime" style={{color: theme.color}}>Start Time: {item.startTime}</div>
                        <div className=".etime" style={{color: theme.color}}>End Time: {item.endTime}</div>
                    </div>
                    <div className="buttons">
                        <button className='btnsinbook' style={{color: theme.color}} onClick={() => changeTimings()}>Change Timings</button>
                        <button className='btnsinbook' style={{color: theme.color}} onClick={() => cancelBooking()}>Cancel Booking</button>
                    </div>
                </div>
            })}
        </div>
    </>
  )
}

export default DashboardBookEntry