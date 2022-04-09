import React, { useEffect, useState } from 'react'
import './Navbar.css';
import Button from "./Button";
import { FaBars, FaTimes } from 'react-icons/fa'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme';
import ToggleBtn from './ToggleBtn';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [{ theme, isDark}, toggleTheme] = useContext(ThemeContext)
  const [ click, setClick ] = useState(false);
  const [ mobileView, setMobileView] = useState(false);
  const [istransparent, setIstransparent] = useState(true)
  const [ bgcolor, setBgColor ] = useState("");
  const [ navbarOp, setNavbarOp ] = useState(0.9);

  const checkMobileView = () =>{
    if (window.innerWidth <= 768){
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }

  const handleClick = () => setClick(!click);

  const navChangeColor = () =>{
    setBgColor(theme.backgroundColor)
    window.onscroll = function() {
      if (document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80 ){
        setBgColor(theme.backgroundColor)
        setIstransparent(false)
        setNavbarOp(1)
      } else{
        setIstransparent(true)
        setNavbarOp(0.9)
      }
    }
  }
  

  useEffect(() => {
    checkMobileView();
    navChangeColor();
  }, [theme, bgcolor])

  return (
    <>
      <div className="navbar" onScroll={() => navChangeColor()} style={istransparent ? {backgroundColor: 'transparent', opacity: navbarOp} : {backgroundColor: bgcolor, opacity: navbarOp}}>
        <div className="navbar--logo">
          <Link to="/">
            <img src="../Assets/Logo.jpg" alt="" />
          </Link>
          <div className="title" style={istransparent ? {color: 'white'} : {color: theme.color}}>Derby Centre</div>
        </div>

        <div className="tgBtn">
          <ToggleBtn onclick={toggleTheme} />
        </div>
        
        <div className="menu--icon" onClick={handleClick}>
          {click ? <FaTimes fill="#A7D129" size="1.5rem"/> : <FaBars fill='#A7D129' size="1.5rem"/>  }
        </div>

        <div className={ mobileView && click ? "mobile" : "menu"}>
          <Link to="/register">
            <Button btnStyle="btn--primary" size="btn--medium" transparent={istransparent}>Register</Button>
          </Link>
          <Link to="/signin">
            <Button btnStyle="btn--primary" size="btn--medium" transparent={istransparent}>Sign in</Button>
          </Link>
          
        </div>
      </div>
    </>   
  )
}

export default Navbar

