import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        isloggedin: false,
        token: undefined
    })
    
    if (currentUser.isloggedin){
        localStorage.setItem('stayLoggedIn', 'true')
        localStorage.setItem('userName', currentUser.name)
        localStorage.setItem('token', currentUser.token)
    }

    useEffect(() => {
        const islogin = localStorage.getItem("stayLoggedIn") === "true"
        const username = localStorage.getItem("userName")
        const token = localStorage.getItem("token")
        if (islogin){
            setCurrentUser({
                name: username,
                isloggedin: islogin,
                token
            })
        }

    },[])
      

    return (
        <UserContext.Provider value={[{currentUser, setCurrentUser}]}>
            {children}
        </UserContext.Provider>
    )
}