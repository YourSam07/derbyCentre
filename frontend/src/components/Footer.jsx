import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook} from 'react-icons/fa'
import "./Footer.css"

function Footer() {
  const [iconHoverColor, setIconHoverColor] = useState("var(--green");
  const [iconHoverColorF, setIconHoverColorF] = useState("var(--green");

  return (
    <>
        <div className="footer">
            <div className="details">
                <img src="../Assets/Logo.jpg" alt="" />
                <p>Derby Centre</p>
                <p>Bundi Rd, Kunadi, Electricity Board Area</p>
                <p>Kota, Rajasthan 324008</p>
            </div>

            <div className="contact">
                <p>Call us on </p>
                <p>+91 98297 xxxxx</p>
            </div>

            <div className="socialMedia">
                <p>Follow us on</p>
                <a href="https://www.instagram.com/derbycentre/?hl=en" target="_blank" rel="noreferrer">
                    <FaInstagram fill={iconHoverColor} size="1.7rem" onMouseOver={() => setIconHoverColor("white")} onMouseOut={() => setIconHoverColor("var(--green)")} />
                </a>
                <a href="https://www.facebook.com/AaokotaKhele/" target="_blank" rel="noreferrer">
                    <FaFacebook fill={iconHoverColorF} size="1.7rem" onMouseOver={() => setIconHoverColorF("white")} onMouseOut={() => setIconHoverColorF("var(--green)")}/>
                </a>
            </div>
        </div>
    </>
  )
}

export default Footer