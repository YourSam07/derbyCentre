import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'
import Card from './Card'
import './ReviewSec.css'
import { AiFillStar} from 'react-icons/ai'

const details  = [
  {
    avatar: '../Assets/avatar-1.jpg',
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi repudiandae, fuga iure voluptates natus doloremque temporibus",
    rating: 5
  },
  {
    avatar: '../Assets/avatar-2.jpg',
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi repudiandae, fuga iure voluptates natus doloremque temporibus",
    rating: 3
  },
  {
    avatar: '../Assets/avatar-3.jpg',
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi repudiandae, fuga iure voluptates natus doloremque temporibus",
    rating: 4
  }
]

function ReviewsSec() {
  const [{theme}] = useContext(ThemeContext)
  return (
    <>
        <div className="reviewSec" style={{backgroundColor: theme.backgroundColor}}>
            <h1 style={{color: theme.color}}>Reviews</h1>
            <div className="cardSec">
                {details.map((item) => {
                    return (<Card imgLoc={item.avatar} desc={item.description} >
                        <div className="stars">
                            {Array(item.rating).fill('').map(() => {return <AiFillStar fill='yellow' size='1.2rem' />})}
                        </div>
                    </Card>)
                })}
            </div>
        </div>
    </>
  )
}

export default ReviewsSec