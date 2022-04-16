import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from '../contexts/theme'
import Error from './Error'
import BookingEntry from './BookingEntry'
import './BookingPage.css'
import './Form.css'
import axios from 'axios'
import { FaIntercom } from 'react-icons/fa'

function BookingPage() {
  const location = useLocation()
  const [{ theme }] = useContext(ThemeContext)
  const [bookingDetailsByDate, setBookingDetailsByDate] = useState()
  const [errMsg, setErrMsg] = useState(null)
  const [total, setTotal] = useState(0)
  const [bookEntryErr, setBookEntryErr] = useState({
    index: -1,
    color: 'none'
  })
  const [bookingData, setBookingData] = useState({
    bname: '',
    phone: '',
    address: '',
    date: '',
    sTime: '',
    eTime: ''
  })

  const postBookingData = async (e) => {
    e.preventDefault()
    let token = localStorage.getItem('userToken')

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      const bookData = await axios.post('http://localhost:8000/api/bookings', bookingData, config)
      console.log(bookData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDateChange = async (e) => {
    e.preventDefault()
    
    setBookingData({ ...bookingData, date: e.target.value })
    const date = { date: e.target.value }
    try {
      const getBookingData = await axios.post('http://localhost:8000/api/bookings/data', date)
      console.log(getBookingData.data)
      setBookingDetailsByDate(getBookingData.data)
    } catch (error) {
      console.log(error)
    }
  }

  const checkTimeClash = (st, et, tval) => {

  }

  const checkCollisionTimings = (e) => {
    e.preventDefault()
    setBookingData({ ...bookingData, sTime: e.target.value })
    const found = bookingDetailsByDate.find(({startTime}) => e.target.value === startTime)
    setErrMsg(null)
    setBookEntryErr((prevState) => ({
      ...prevState,
      color: 'none',
    }));
    if(found){
      setErrMsg(`Oops There's clash of timings between you and ${found.bookingName} Please select another time or date`)
      setBookEntryErr({
        index: found._id,
        color: 'rgb(255, 93, 126)'
      })
    }
  }


  return (
    <>
      {errMsg ? <Error color='rgb(255, 93, 126)'>{errMsg}</Error> : null}
      {location.state?.isLoggedin ? <Error color='rgb(165, 255, 69)'>You have succefully logged in, You can book a slot Now!</Error> : null}
      <div className="bookingPage" style={{ backgroundColor: theme.backgroundColor }}>
        <div className='leftside' style={{ color: theme.color }}>
          <div className="dateWrapper">
            <p>Select the Date on which you want to play: </p>
            <input type="date" name="" id="" min={new Date().toISOString().split('T')[0]} onChange={(e) => handleDateChange(e)} />
          </div>
          {!bookingDetailsByDate || bookingDetailsByDate.length === 0 ?
            <div className="noData" style={{ color: theme.color, fontSize: '2rem', textAlign: 'center' }}>We have no Booking today</div> :
            (
              <div>
                <BookingEntry serialNum='S. No.' name='Booking Name' start='Start Time' end='End Time' />
                {bookingDetailsByDate.map((item, index) => {
                  console.log(item._id, bookEntryErr.index)
                  if (item._id === bookEntryErr.index) {
                    console.log('we are In color should change')
                    console.log(bookEntryErr.color)
                    return <BookingEntry serialNum={index + 1} name={item.bookingName} start={item.startTime} end={item.endTime} errbgcolor={bookEntryErr.color} />
                  } else {
                    return <BookingEntry serialNum={index + 1} name={item.bookingName} start={item.startTime} end={item.endTime} />
                  }
                })}
              </div>
            )
          }

        </div>
        <div className="rightside">
          <div className="form-wrapper" style={{ backgroundImage: theme.formColor }}>
            <form onSubmit={postBookingData} className="formRegister">
              <h1 style={{ color: theme.color }}>Book Slot</h1>
              <input className='inFields' type="text" name="" id="" placeholder='Enter a booking name' onChange={(e) => setBookingData({ ...bookingData, bname: e.target.value })} />
              <input className='inFields' type="tel" name="" id="" placeholder='Enter Your Number' onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })} />
              <input className='inFields' type="address" name="" id="" placeholder='Enter Address' onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })} />
              <div className="time" style={{ color: theme.color }}>
                <div className="timeWrapper">
                  <h3 >Start Time</h3>
                  <input className='timeField' type="time" name="" id="" step='900' autocomplete="off" onChange={(e) => checkCollisionTimings(e)} />
                </div>
                <div className="timeWrapper">
                  <h3>End Time</h3>
                  <input className='timeField' type="time" name="" id="" step='900' onChange={(e) => setBookingData({ ...bookingData, eTime: e.target.value })} />
                </div>
              </div>
              <div className="total">
                <span style={{ color: theme.color }}>Total Payment:</span>
                <span style={{ color: theme.color }}>400</span>
              </div>
              <button type="submit">Proceed to Payment</button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default BookingPage

{/* <h1>Cancelation Policy</h1>
<p>1. Full Money will be refunded if you cancel before 2 hours of your booking.</p>
<p>2. Half of the Money will be refunded if you cancel before 1 hour of your booking.</p>
<p>3. No Money will be refunded if you cancel your booking after that.</p> 
{new Date().toISOString().split('T')[0]
*/}