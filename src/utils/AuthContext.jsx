import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from 'appwrite';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserOnLoad();
  }, [])

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      // Test for 401 error (Does nothing, await account.get() does not resolve.)
      console.log(accountDetails);
      setUser(accountDetails);
    } catch(error) {
      console.error(error);
      console.log(error);
    }
    setLoading(false);
  }

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      const response = await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch(error) {
      console.error(error);
    }
  }

  const handleUserLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
  }

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password !== credentials.passwordConfirm) {
      alert('Passwords do not match.');
      return;
    }

    try {
      let response = await account.create(
        ID.unique(),
        // Why does it only seem to work when credentials.name is last?
        credentials.email,
        credentials.password,
        credentials.name
        );

      await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');

      console.log('REGISTERED:', response);
    } catch(error) {
      console.error(error);
    }
  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister
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