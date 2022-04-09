import { createContext, useState, useEffect } from "react";

const themes ={
    dark: {
        backgroundColor: "#0f1410",
        color: "#FFF",
        secColor: "#ebefe8",
        accent: "rgb(11 200 118)",
        accent2: "rgb(10 300 118)"
    },
    light: {
        backgroundColor: "#FFF",
        color: "#000",
        secColor: "#ebefe8",
        accent: "rgb(11 200 118)",
        accent2: "rgb(10 300 118)"
    }
}

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false)
    const toggleTheme = () => {
        localStorage.setItem("isDark", JSON.stringify(!isDark))
        setIsDark(!isDark)
    }
    const theme = isDark ? themes.dark : themes.light

    useEffect(() => {
        const isDark = localStorage.getItem("isDark") === "true"
        setIsDark(isDark)
    }, [])

    return (
        <ThemeContext.Provider value={[{theme, isDark}, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}



