import React, { useContext } from 'react';
import "./Button.css";
import { ThemeContext } from '../contexts/theme'

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', "btn--large"];

function Button({ children, btnStyle, size, onclick, transparent}) {
    const [{theme}] = useContext(ThemeContext)
    const buttonStyle = STYLES.includes(btnStyle) ? btnStyle : STYLES[0];
    const buttonSize = SIZES.includes(size) ? size : SIZES[0];

    return (
        <>
            <button
                className={`btn ${buttonStyle} ${buttonSize}`}
                onClick={onclick}
                style={transparent ? {color: 'white'} : {color: theme.color}}
            >{children}
            </button>
        </>
    )
}

export default Button