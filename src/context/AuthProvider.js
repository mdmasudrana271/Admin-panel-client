import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();
export const ThemeContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [theme, setTheme] = useState("light");
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const hour = new Date().getHours()
  const minutes = new Date().getMinutes()
  const time = {
    hour,
    minutes
  }

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
      }
    
      const signInWithEmailPassword = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
      }

      const updateUserProfile =(profile)=>{
        setLoading(true)
       return updateProfile(auth.currentUser, profile)
      }
    
      const logOut = ()=>{
        localStorage.removeItem('photography')
        signOut(auth)
        .then(()=>{
          console.log('log out success')
          localStorage.removeItem('bookAccessToken')
        })
        .catch(error => {
          console.log(error.message)
        })
      }
    
      const googleLogin = (googleProvider)=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
      }

      const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
      };


    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
          setUser(currentUser)
          setLoading(false)
        })
        return ()=>{
          unsubscribe();
        }
      },[])

    const authInfo = {user ,createUser ,time, signInWithEmailPassword, googleLogin, logOut, resetPassword, loading, updateUserProfile}
  return (
    <AuthContext.Provider value={authInfo}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
