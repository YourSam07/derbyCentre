import { createContext, useState } from "react"
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const fetchCurrentUser = async () => {
        const response = await axios.post('http://localhost:8000/api/users/login')
        setCurrentUser(response.name)
    }

    return (
        <UserContext.Provider value={{currentUser, fetchCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}