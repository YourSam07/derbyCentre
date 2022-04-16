import { createContext, useState, useEffect } from "react";

const themes ={
    dark: {
        backgroundColor: "#0f1410",
        color: "#FFF",
        navFootColor: "rgb(7 11 5)",
        accent: "rgba(50, 46, 251, 0.736)",
        accent2: "rgb(0, 225, 255)",
        formColor: "linear-gradient(45deg, rgba(50, 46, 251, 0.736), rgb(0, 225, 255))"
    },
    light: {
        backgroundColor: "#FFF",
        color: "#000",
        navFootColor: "rgb(204 249 255)",
        accent: "rgb(11 200 118)",
        accent2: "rgb(10 300 118)",
        formColor: "linear-gradient(45deg, rgb(11 200 118), rgb(10 400 10))"
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



