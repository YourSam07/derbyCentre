import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import './Navbar.css';
import Button from "./Button";
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { ThemeContext } from '../contexts/theme';
import ToggleBtn from './ToggleBtn';
import { Link,  useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../contexts/userContext';

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [{ theme}, toggleTheme] = useContext(ThemeContext)
  const [{currentUser, setCurrentUser}] = useContext(UserContext)
  const [ click, setClick ] = useState(false);
  const [ mobileView, setMobileView] = useState(false);
  const [istransparent, setIstransparent] = useState(true)
  const [ bgcolor, setBgColor ] = useState("");
  const [ navbarOp, setNavbarOp ] = useState(0.9);
  const handleClick = () => setClick(!click);
  window.onresize = function(){
    if (window.innerWidth <= 768){
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  } 

  window.onscroll = function() {
    if (location.pathname === '/'){
      if (document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80 ){
        setBgColor(theme.navFootColor)
        setIstransparent(false)
        setNavbarOp(1)
      }
      else{
        setIstransparent(true)
        setNavbarOp(0.9)
      }
    } else {
      setIstransparent(false)
      setNavbarOp(1)
    }
  }

  const logout = () => {
    localStorage.setItem('stayLoggedIn', 'false')  
    setCurrentUser({isloggedin: false})
    setClick(false)
    navigate('/')
  } 

  const profiletodash = () => {
    setClick(false)
    navigate('/dashboard')
  }

  useEffect(() => {
    setBgColor(theme.navFootColor)
  }, [theme, bgcolor])

  return (
    <>
      <div className="navbar" style={istransparent ? {backgroundColor: 'transparent', opacity: navbarOp} : {backgroundColor: bgcolor, opacity: navbarOp}}>
        <div className="navbar--logo">
          <Link to="/">
            <img src="../Assets/Logo.jpg" alt="" />
          </Link>
          <div className="title" style={istransparent ? {color: 'white'} : {color: theme.color}}>Derby Centre</div>
        </div>

        <div className="tgBtn">
          <ToggleBtn onclick={toggleTheme} />
        </div>
        
        <div className={ currentUser.isloggedin ? "icon-show" : "menu--icon"} onClick={handleClick}>
        {currentUser.isloggedin ? 
          <FaUserCircle fill={theme.color} size="2rem" cursor='pointer'/>
          :
          click ? <FaTimes fill="#A7D129" size="1.5rem" cursor='pointer'/> : <FaBars fill='#A7D129' size="1.5rem" cursor='pointer'/> 
        }
        </div>
        
        {currentUser.isloggedin ? 
          <div className={ mobileView && click ? "mobile" : (click ? "drop-down" : "hide")}>
              <p onClick={() => profiletodash()}>Your profile <span><BsPersonBoundingBox fill='white' size='2rem'/></span></p>
              <button className='logout' onClick={logout}>
                <span >Logout </span>
                <span><RiLogoutBoxRFill size='2rem' fill='white'></RiLogoutBoxRFill></span>
              </button>
          </div>  :
          <div className={ mobileView && click ? "mobile" : "menu"}>
            <Link to="/register">
              <Button btnStyle="btn--primary" size="btn--medium" transparent={istransparent} onclick={() => setClick(false)}>Register</Button>
            </Link>
            <Link to="/signin">
              <Button btnStyle="btn--primary" size="btn--medium" transparent={istransparent} onclick={() => setClick(false)}>Sign in</Button>
            </Link>            
          </div>
        }
      </div>
    </>   
  )
}

export default Navbar

// 