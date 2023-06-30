import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      const response = await account.createEmailSession(credentials.email, credentials.password);
    } catch(error){
      console.error(error);
    }
  }

  const contextData = {
    user,
    handleUserLogin
  }
  
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext