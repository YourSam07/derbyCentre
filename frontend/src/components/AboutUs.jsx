import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'
import Card from './Card'
import './ReviewSec.css'

const details = [
    {
        avatar: '../Assets/avatar-4.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi repudiandae, fuga iure voluptates natus doloremque temporibus",
    },
    {
        avatar: '../Assets/avatar-5.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi repudiandae, fuga iure voluptates natus doloremque temporibus",
    },
    {
        avatar: '../Assets/avatar-6.jpg',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi repudiandae, fuga iure voluptates natus doloremque temporibus",
    }
]

const AboutUs = () => {
    const [{ theme }] = useContext(ThemeContext)
    return (
        <>
            <div className="reviewSec" style={{ backgroundColor: theme.backgroundColor }}>
                <h1 style={{ color: theme.color }}>About Us</h1>
                <div className="cardSec">
                    {details.map((item) => {
                        return (<Card imgLoc={item.avatar} desc={item.description} />)
                    })}
                </div>
            </div>
        </>
    )
}

export default AboutUs