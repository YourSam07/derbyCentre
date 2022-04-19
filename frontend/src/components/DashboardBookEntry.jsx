import React, { useEffect, useContext } from 'react'
import './DashboardBookEntry.css'
import axios from 'axios'
import { UserContext } from '../contexts/userContext'

function DashboardBookEntry() {
  const [{currentUser}] = useContext(UserContext)

  useEffect(async() => {
    let token = currentUser.token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const bookingsOfaUser = await axios.get('http://localhost:8000/api/users', config)
        console.log(bookingsOfaUser)
    } catch (error) {
        console.log(error)
    }
    
  }, [])
  return (
    <>
        <div className="dashboardSec">

        </div>
    </>
  )
}

export default DashboardBookEntry