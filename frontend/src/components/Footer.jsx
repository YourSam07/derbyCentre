import React, { useState, useContext } from 'react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { ThemeContext } from '../contexts/theme'
import "./Footer.css"

function Footer() {
  const [{theme}] = useContext(ThemeContext)
  const [iconHoverColor, setIconHoverColor] = useState(theme.color);
  const [iconHoverColorF, setIconHoverColorF] = useState(theme.color);

  return (
    <>
        <div className="footer" style={{backgroundColor: theme.navFootColor}}>
            <div className="details" style={{color: theme.color}}>
                <img src="../Assets/Logo.jpg" alt="" />
                <p>Derby Centre</p>
                <p>Bundi Rd, Kunadi, Electricity Board Area</p>
                <p>Kota, Rajasthan 324008</p>
            </div>

            <div className="contact" style={{color: theme.color}}>
                <p>Call us on </p>
                <p>+91 98297 xxxxx</p>
            </div>

            <div className="socialMedia" style={{color: theme.color}}>
                <p>Follow us on</p>
                <a href="https://www.instagram.com/derbycentre/?hl=en" target="_blank" rel="noreferrer">
                    <FaInstagram fill={iconHoverColor} size="1.7rem" onMouseOver={() => setIconHoverColor(theme.accent)} onMouseOut={() => setIconHoverColor(theme.color)}/>
                </a>
                <a href="https://www.facebook.com/AaokotaKhele/" target="_blank" rel="noreferrer">
                    <FaFacebook fill={iconHoverColorF} size="1.7rem" onMouseOver={() => setIconHoverColorF(theme.accent)} onMouseOut={() => setIconHoverColorF(theme.color)}/>
                </a>
            </div>
        </div>
    </>
  )
}
// onMouseOut={() => setIconHoverColorF(theme.color)}
// onMouseOut={() => setIconHoverColor(theme.color)} 
export default Footer