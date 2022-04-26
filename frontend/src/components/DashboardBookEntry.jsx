import React, { useEffect, useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Modal from 'react-modal';
import './DashboardBookEntry.css'
import axios from 'axios'
import Error from './Error'
import Button from './Button'
import { UserContext } from '../contexts/userContext'
import { ThemeContext } from '../contexts/theme'

Modal.defaultStyles.overlay.backgroundColor = '#0000008e';
const customStyles = {
  content: {
    padding: '1rem 2rem 1rem 2rem',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '6px',
    width: '456px',
    height: '420px'
  },
};

function DashboardBookEntry() {
  const [{ currentUser }] = useContext(UserContext)
  const [{ theme }] = useContext(ThemeContext)
  const [userbookdata, setUserBookData] = useState([])
  const [openCTModal, setOpenCTModal] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [currentId, setCurrentId] = useState()
  const [errMsg, setErrMsg] = useState(null)
  const [bookingData, setBookingData] = useState()
  const [changeDetails, setchangeDetails] = useState({
    st: '',
    et: '',
    dt: '',
  })

  const todate = (date) => {
    const d = new Date(date)
    return d.toString().split(' ').slice(0, 4).join(' ')
  }

  const getData = async () => {
    const config = {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    }
    try {
      const bookingsOfaUser = await axios.get('http://localhost:8000/api/bookings', config)
      setUserBookData(bookingsOfaUser.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDateChange = async (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setchangeDetails({ ...changeDetails, dt: e.target.value })
    const date = { date: e.target.value }
    try {
      const bData = await axios.post('http://localhost:8000/api/bookings/data', date)
      console.log(bData.data)
      setBookingData(bData.data)
    } catch (error) {
      console.log(error)
    }
  }

  const checkCollisionTimings = (e, isST = false) => {
    e.preventDefault()
    if (isST) {
      setchangeDetails({ ...changeDetails, st: e.target.value })
    } else {
      setchangeDetails({ ...changeDetails, et: e.target.value })
    }
    const found = bookingData.find(({ startTime, endTime }) => e.target.value >= startTime && e.target.value < endTime)
    setErrMsg(null)
    console.log(found)
    if (found) {
      setErrMsg(`Sorry there is already a booking from ${found.startTime} to ${found.endTime}. Please select a different time or date.`)
    }
  }

  const openModalandSetId = (id) => {
    setOpenCTModal(true)
    setCurrentId(id)
  }

  const handleTimeChange = async () => {
    console.log(currentId, currentUser.token)
    let config = {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    }

    try {
      await axios.put(`http://localhost:8000/api/bookings/${currentId}`, changeDetails, config)
      setOpenCTModal(false)
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const cancelBooking = async (id, askconfirmation = false) => {
    let config = {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    }
    if (askconfirmation) {
      if (window.confirm('Are you sure you want to cancel the booking?')) {
        try {
          await axios.delete(`http://localhost:8000/api/bookings/${id}`, config)
          getData()
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      try {
        await axios.delete(`http://localhost:8000/api/bookings/${id}`, config)
        getData()
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (currentUser.token) {
      getData()
    }
  }, [currentUser.token])

  return (
    <>
      {errMsg ? <Error color='rgb(255, 93, 126)'>{errMsg}</Error> : null}
      <div className="dashboardSec" style={{ backgroundColor: theme.backgroundColor }}>
        <h1 style={{ color: theme.color, marginBottom: '1.5rem' }}>Your Bookings</h1>
        {userbookdata.map((item) => {
          if (new Date(item.date) >= today) {
            return <div className="cardBook">
            <div className="date" style={{ color: theme.color }}>{todate(item.date)}</div>
            <div className="bookdetails">
              <div className="heading" style={{ color: theme.color }}>{item.bookingName}</div>
              <div className="stime" style={{ color: theme.color }}>Start Time: {item.startTime}</div>
              <div className=".etime" style={{ color: theme.color }}>End Time: {item.endTime}</div>
            </div>
            <div className="buttons">
              <button className='btnsinbook' onClick={() => openModalandSetId(item._id)}>Change Timings</button>
              <button className='btnsinbook' onClick={() => cancelBooking(item._id, true)}>Cancel Booking</button>
            </div>
          </div>
          }          
        })}
        <Modal
          isOpen={openCTModal}
          style={customStyles}
          onRequestClose={() => setOpenCTModal(false)}
          shouldCloseOnOverlayClick={true}
        >
          <div className="Modal">
            <h2>Change the Date and Timings of your bookings here</h2>
            <div className="changes">
              <div className="inwrapper">
                <label htmlFor="">Change Date</label>
                <input type="date" name="" id="" min={new Date().toISOString().split('T')[0]} onChange={(e) => handleDateChange(e)} />
              </div>
              <div className="inwrapper">
                <label htmlFor="">Change Start Time</label>
                <input type="time" step='900' name='' id='' onChange={(e) => checkCollisionTimings(e, true)} />
              </div>
              <div className="inwrapper">
                <label htmlFor="">Change End Time</label>
                <input type="time" step='900' name='' id='' onChange={(e) => checkCollisionTimings(e)} />
              </div>
              <div className="modalBtn">
                <Button btnStyle="btn--outline" size='btn--extra' onclick={handleTimeChange}>Confirm Time Change</Button>
              </div>
            </div>
          </div>

        </Modal>
      </div>
    </>
  )
}

export default DashboardBookEntry


// let config = {
//   headers: {'Authorization': `Bearer ${currentUser.token}`}
// }
// try {
//   await axios.put(`http://localhost:8000/api/bookings/${obj._id}`, {
//     sTime: location.state.st,
//     eTime: location.state.et,
//     date: location.state.dt
//   },config)
// } catch (error) {
//   console.log(error)
// }